### Description:

[Universal Dependencies](https://universaldependencies.org/) (UD) is a framework for consistent annotation of grammar (parts of speech, morphological features, and syntactic dependencies) across different human languages. 

The Romanian RRT Treebank is the standard treebank for Romanian. 

This page is common for the following tasks:

• UD Romanian RRT Treebank 2.5 - **Tokenization**

• UD Romanian RRT Treebank 2.5 - **Sentence Segmentation**

• UD Romanian RRT Treebank 2.5 - **Lemmatization**

• UD Romanian RRT Treebank 2.5 - **POS Tagging**

• UD Romanian RRT Treebank 2.5 - **Dependency parsing**


### Input, Output and Metrics:

There are train, dev and test files, in raw format (text) and in the CoNLL-U.
Full details on the CoNLL-U format are found [here](https://universaldependencies.org/format.html)

To perform evaluation, please use the official script available [here](http://universaldependencies.org/conll18/evaluation.html). It offers both prediction_file/gold_file and in-memory functions, evaluating all target metrics in one go.

Per task metrics (as given by the evaluation script above):

• **Tokenization**: **Tokens** F1 score

• **Sentence Segmentation**: **Sentences** F1 score

• **Lemmatization**: **Lemma** F1 score

• **POS Tagging**: **UPOS**, **XPOS** and **AllTags**  F1 scores

• **Dependency parsing**: **UAS** and **LAS** F1 scores

### Download from:

Download the treebank from [here](https://lindat.mff.cuni.cz/repository/xmlui/bitstream/handle/11234/1-3105/ud-treebanks-v2.5.tgz?sequence=1&isAllowed=y). Unzip the file.

### Starter code:

Not yet available, please download directly from source.

### Citation:

If you use this dataset in a published work, please cite the following:

> Joakim Nivre, Marie-Catherine de Marneffe, Filip Ginter, Yoav Goldberg, Jan Hajič, Christopher D. Manning, Ryan McDonald, Slav Petrov, Sampo Pyysalo, Natalia Silveira, Reut Tsarfaty, Daniel Zeman. 2016. Universal Dependencies v1: A Multilingual Treebank Collection. In Proceedings of LREC.

or, in bibtex format:

> @inproceedings{nivre-etal-2016-universal,
>    title = "{U}niversal {D}ependencies v1: A Multilingual Treebank Collection",
>    author = "Nivre, Joakim  and
>      de Marneffe, Marie-Catherine  and
>      Ginter, Filip  and
>      Goldberg, Yoav  and
>      Haji{\v{c}}, Jan  and
>      Manning, Christopher D.  and
>      McDonald, Ryan  and
>      Petrov, Slav  and
>      Pyysalo, Sampo  and
>      Silveira, Natalia  and
>      Tsarfaty, Reut  and
>      Zeman, Daniel",
>    booktitle = "Proceedings of the Tenth International Conference on Language Resources and Evaluation ({LREC}'16)",
>    month = may,
>    year = "2016",
>    address = "Portoro{\v{z}}, Slovenia",
>    publisher = "European Language Resources Association (ELRA)",
>    url = "https://www.aclweb.org/anthology/L16-1262",
>    pages = "1659--1666",
>    abstract = "Cross-linguistically consistent annotation is necessary for sound comparative evaluation and cross-lingual learning experiments. It is also useful for multilingual system development and comparative linguistic studies. Universal Dependencies is an open community effort to create cross-linguistically consistent treebank annotation for many languages within a dependency-based lexicalist framework. In this paper, we describe v1 of the universal guidelines, the underlying design principles, and the currently available treebanks for 33 languages.",
>}