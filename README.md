# adobe-illustrator-get-layer-coordinate
Export illustrator coordinate data of layers with specify prefix to a JSON file.

This a script base on Adobe extendScript and javascript.
Only tested on CC 2018.


Result Example:
```
{
  "artboardSize": {
    "width": 612,
    "height": 792
  },
  "metaData": [
    {
      "name": "object-light",
      "url": "<resource_dir>object-light<resource_type>",
      "x": 123.109642477877,
      "y": 315.457650205742,
      "width": 13.75,
      "height": 70.1694966645427,
      "zIndex": 3
    },
    {
      "name": "object-road",
      "url": "<resource_dir>object-road<resource_type>",
      "x": 92.325842477876,
      "y": 273.425201461991,
      "width": 221.1594,
      "height": 129.128297076022,
      "zIndex": 2
    },
    {
      "name": "object-tree",
      "url": "<resource_dir>object-tree<resource_type>",
      "x": 172.965842477878,
      "y": 196.347100000003,
      "width": 85.8357999999998,
      "height": 120.716699999999,
      "zIndex": 1
    }
  ]
 ```
}


