### Description:

[Universal Dependencies](https://universaldependencies.org/) (UD) is a framework for consistent annotation of grammar (parts of speech, morphological features, and syntactic dependencies) across different human languages.

The Romanian RRT Treebank is the standard treebank for Romanian.

This page is common for the following tasks:

• UD Romanian RRT Treebank 2.8 - **Cross-domain POS Tagging**

• UD Romanian RRT Treebank 2.8 - **Cross-domain Dependency parsing**


### Input, Output and Metrics:

There are train, dev and test files, in raw format (text) and in the CoNLL-U. We trained on a number of selected domains, and test on a domain not included in the train and dev set.
Full details on the CoNLL-U format are found [here](https://universaldependencies.org/format.html)

To perform evaluation, please use the official script available [here](http://universaldependencies.org/conll18/evaluation.html). It offers both prediction_file/gold_file and in-memory functions, evaluating all target metrics in one go.

Per task metrics (as given by the evaluation script above):

• **POS Tagging**: **UPOS**, **XPOS** and **AllTags**  F1 scores

• **Dependency parsing**: **UAS** and **LAS** F1 scores

### Download from:

Download the treebank from [here](https://lindat.mff.cuni.cz/repository/xmlui/bitstream/handle/11234/1-3105/ud-treebanks-v2.5.tgz?sequence=1&isAllowed=y). Unzip the file.

### Starter code:

Not yet available, please download directly from source.

### Citation:

If you use this dataset in a published work, please cite the following:

> Barbu Mititelu, V., Ion, R., Simionescu, R., Irimia, E., & Perez, C. A. (2016, September). The romanian treebank annotated according to universal dependencies. In Proceedings of the tenth international conference on natural language processing (hrtal2016).

or, in bibtex format:

>     @inproceedings{barbu2016romanian,
>        title = "The romanian treebank annotated according to universal dependencies",
>        author = "Barbu Mititelu, Verginica and Ion, Radu and Simionescu, Radu and Irimia, Elena and Perez, Cenel-Augusto",
>        booktitle = "Proceedings of the tenth international conference on natural language processing (hrtal2016)",
>        year = "2016",
>     }
