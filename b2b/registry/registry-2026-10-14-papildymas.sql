-- IdeasWood B2B registras — papildymas prie registry-2026-10-07.sql (paleisti PO jo).
-- Pirma ant kopijos: sqlite3 /tmp/pre-20261007.sqlite < šis.sql
-- Stulpelių vardai tie patys kaip 10-07 faile; jei .schema rodo kitus — pataisyti abu failus vienodai.

.bail on
BEGIN;

-- ── 1. Spraga 10-07 trigeryje: jis saugo tik UPDATE. Užsakymas, iškart ĮRAŠYTAS su stage='production'
--      (senas checkout'o kodas, rankinis INSERT), praeitų be avanso. Uždarom ir INSERT kelią.
DROP TRIGGER IF EXISTS orders_insert_production_needs_advance;
CREATE TRIGGER orders_insert_production_needs_advance
BEFORE INSERT ON orders
WHEN NEW.stage = 'production'
BEGIN
  SELECT RAISE(ABORT, 'Į gamybą negalima: avansas negautas (naujas užsakymas kuriamas awaiting_advance)');
END;

-- ── 2. Icesmartmodular — bankrutavęs (Justino sprendimas 2026-10-14). NE trinti: istorija lieka.
--      Pirma pažiūrėti:  SELECT id, name FROM clients WHERE name LIKE '%icesmart%';
--                        .schema clients      .schema b2b_partners
--      Tada atkomentuoti tą eilutę, kurios stulpelis egzistuoja:
-- UPDATE clients      SET active = 0           WHERE name LIKE '%icesmart%';
-- UPDATE b2b_partners SET disabled_at = datetime('now') WHERE client_id IN (SELECT id FROM clients WHERE name LIKE '%icesmart%');
-- DELETE FROM sessions WHERE user_id IN (SELECT id FROM b2b_partners WHERE client_id IN (SELECT id FROM clients WHERE name LIKE '%icesmart%'));

COMMIT;

-- ── 3. „production" be avanso → atgal į „awaiting_advance". NE aklai:
--      10-07 failo SELECT išvedė sąrašą. Kiekvieną užsakymą Justinas/Laura patvirtina, kad avansas tikrai
--      negautas (gali būti sumokėtas grynais ar įrašytas ne į payments). Tik tada, su konkrečiais id:
-- UPDATE orders SET stage = 'awaiting_advance' WHERE stage = 'production' AND id IN (/* patvirtinti id */);

-- Patikra:
SELECT name FROM sqlite_master WHERE type = 'trigger' AND tbl_name = 'orders';
-- turi rodyti: orders_production_needs_advance, orders_insert_production_needs_advance
