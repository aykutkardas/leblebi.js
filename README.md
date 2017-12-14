![leblebi.js logo](https://github.com/aykutkardas/leblebi.js/blob/master/leblebi-js-logo.png)

Cool and easy to autocomplete library. ⚡️

![leblebi.js preview](https://github.com/aykutkardas/leblebi.js/blob/master/preview2.gif)

### init leblebi

```html
 <script src="./leblebi.js"></script>
```



"target" your input element
"source" your data



### and start for JSON

```js
  var keywords = [
    { tag: 'Leblebi' }, 
    { tag: 'Çelebice' }, 
    { tag: 'İlelebet' }, 
    { tag: 'Kalebent' }, 
    { tag: 'Plebisit' }
  ];
  
  leblebi({
      target: '.search',
      source: keywords,
      field: 'tag'
  });
```
### or Array

```js
  var keywords = ['Leblebi', 'Çelebice', 'İlelebet', 'Kalebent', 'Plebisit'];
  
  leblebi({
      target: '.search',
      source: keywords
  });
```

### JQuery support

```js
 var keywords = ['Leblebi', 'Çelebice', 'İlelebet', 'Kalebent', 'Plebisit'];
 
 $('.search').leblebi({source:keywords});

```
