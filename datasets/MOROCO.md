### Description:

MOROCO, the Moldavian and Romanian Dialectal Corpus, contains Moldavian and Romanian samples of text collected from the news domain. The samples belong to one of the following six topics: culture, finance, politics, science, sports, tech. The data set is divided into three subsets: training (21719 samples), validation (5921 samples), test (5924 samples).

### Input, Output and Metrics:

The task is to classify each news article into one of the six classes. Given the training and validation sets, the target is to maximize the macro-averaged F1 score on the test set. 

The reported metric is the **Macro-averaged F1 score**.

### Download from:

[https://github.com/butnaruandrei/MOROCO](https://github.com/butnaruandrei/MOROCO)

### Starter code:

The following script loads the data samples into memory:

[https://github.com/butnaruandrei/MOROCO/blob/master/loadDataSet.py](https://github.com/butnaruandrei/MOROCO/blob/master/loadDataSet.py)

With minor changes, the following script can be used for the evaluation: 

[https://github.com/butnaruandrei/MOROCO/blob/master/MOROCO/Var-Dial-MRC-2019-eval/eval.py](https://github.com/butnaruandrei/MOROCO/blob/master/MOROCO/Var-Dial-MRC-2019-eval/eval.py)

### Citation:

If you use this dataset in a published work, please cite the following:

> Andrei M. Butnaru, Radu Tudor Ionescu. MOROCO: The Moldavian and Romanian Dialectal Corpus. In Proceedings of ACL, pp. 688–698, 2019. [Read the fulll paper](https://www.aclweb.org/anthology/P19-1068/)

or in .bibtex format:

>   @inproceedings{butnaru-ionescu-2019-moroco,
>   
>   title = "{MOROCO}: The {M}oldavian and {R}omanian Dialectal Corpus",
>   author = "Butnaru, Andrei and Ionescu, Radu Tudor",
>   booktitle = "Proceedings of the 57th Annual Meeting of the Association for Computational Linguistics",
>   month = jul,
>   year = "2019",
>   url = "https://www.aclweb.org/anthology/P19-1068",
>   doi = "10.18653/v1/P19-1068",
>   pages = "688--698",
>   }
