#!/usr/bin/env python3
"""Builds seo/fixes/publish-kit-2026-11-24.html from the category packs. Run: python3 build-publish-kit.py"""
import re, json, os
base = os.path.dirname(os.path.abspath(__file__))
packs = {
 'category-pack-2026-11-23-a': ['a-frames','home-offices-studios','garden-cabins'],
 'category-pack-2026-11-23-b': ['aluminum-pergola','wooden-pergola','pergola','pergolas-cabins','bbq-grill-cabin','grill-sets'],
 'category-pack-2026-11-23-c': ['hot-tubs','external-heater','square-hot-tubs','garages-carports','summer-houses-chalets','sheds-storage-cabins'],
}
h1_first = {'a-frames','home-offices-studios','garden-cabins','garages-carports','summer-houses-chalets','sheds-storage-cabins'}
prio = ['a-frames','aluminum-pergola','hot-tubs','garden-cabins','home-offices-studios','wooden-pergola','pergola','bbq-grill-cabin','garages-carports','summer-houses-chalets','sheds-storage-cabins','external-heater','square-hot-tubs','pergolas-cabins','grill-sets']
def rd(p): return open(p,encoding='utf-8').read().strip()
items=[]
for pk,dirs in packs.items():
    for d in dirs:
        p=os.path.join(base,pk,d)
        tm=rd(p+'/title-meta.txt')
        tid=re.search(r'term ID (\d+)',tm).group(1)
        url=re.search(r'^URL: (\S+)',tm,re.M).group(1)
        name=re.match(r'Category: (.+?) \(',tm).group(1)
        fk=re.search(r'Focus keyword: (.+)',tm).group(1).strip()
        sec=re.search(r'^Secondary: (.+)',tm,re.M)
        new=tm.split('\nNEW\n')[1]
        title=re.search(r'^Title: (.+)',new,re.M).group(1).strip()
        meta=re.search(r'^Meta:\s+(.+)',new,re.M).group(1).strip()
        hs=re.findall(r'^(<h1>.*?</h1>)',tm,re.M)
        h1=type('M',(),{'group':lambda self,n,v=hs[-1] if hs else None:v})() if hs else None
        intro=rd(p+'/intro-above-grid.html'); guide=rd(p+'/guide-below-grid.html')
        if d in h1_first:
            assert h1, d
            desc=h1.group(1)+'\n'+intro+'\n<!--iw-below-->\n'+guide
            order='H1 + įvadas virš prekių tinklelio, po to žymeklis ir gidas po tinkleliu'
        else:
            desc='<!--iw-below-->\n'+intro+'\n'+guide
            order='Žymeklis pirmas: visas tekstas rodomas po prekių tinkleliu (Divi šablonas)'
        items.append(dict(key=d,id=tid,name=name,url=url,fk=fk,sec=sec.group(1) if sec else '',title=title,meta=meta,desc=desc,order=order,
            edit=f'https://ideaswood.eu/wp-admin/term.php?taxonomy=product_cat&tag_ID={tid}&post_type=product',kind='cat'))
items.sort(key=lambda i: prio.index(i['key']))
# planning page
pl=os.path.join(base,'planning-2026-11-24')
pm=rd(pl+'/new-title-meta.txt')
ptitle=re.search(r'SEO TITLE.*?\n(.+)\n',pm).group(1).strip()
pmeta=re.search(r'META DESCRIPTION.*?\n(.+)\n',pm).group(1).strip()
ph1=re.search(r'\(the WordPress page title field.*?\n(.+)\n',pm).group(1).strip()
sec=rd(pl+'/sections.html'); faq=rd(pl+'/faq.html'); edits=rd(pl+'/edits.md')
planning=dict(key='planning',id='18376',name='Planning permission guide (page)',url='https://ideaswood.eu/log-cabin-planning-permission-uk/',
  fk='log cabin planning permission',sec='',title=ptitle,meta=pmeta,h1=ph1,sections=sec,faq=faq,edits=edits,
  edit='https://ideaswood.eu/wp-admin/post.php?post=18376&action=edit',kind='page')
data=json.dumps({'items':items,'planning':planning},ensure_ascii=False).replace('</','<\\/')
tpl=open(base+'/publish-kit.template.html',encoding='utf-8').read()
out=tpl.replace('/*DATA*/',data)
open(base+'/publish-kit-2026-11-24.html','w',encoding='utf-8').write(out)
print(len(items),'categories;',len(out)//1024,'KB')
for i in items: print(i['id'],len(i['title']),len(i['meta']),len(i['desc']))
print(ptitle,len(ptitle),pmeta,len(pmeta),ph1)
