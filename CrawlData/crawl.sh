#!/usr/bin/bash

file_list=("/home/hoang/Documents/ProjectEcomerce/CrawlData/CrawlDataPhone/main.py")
                                                                                          
for py_file in "${file_list[@]}"
do
    PYTHONPATH=/home/hoang/.local/lib/python3.8/site-packages /usr/bin/python3 ${py_file}
done
