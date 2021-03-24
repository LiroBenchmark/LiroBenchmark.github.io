### Input, Output and Metrics:

There are train, dev and test files, in raw format (text) and in the CoNLL-U.
Full details on the CoNLL-U format are found [here](https://universaldependencies.org/format.html)

To perform evaluation, please use the official script available [here](http://universaldependencies.org/conll18/evaluation.html). It offers both prediction_file/gold_file and in-memory functions, evaluating all target metrics in one go.

Per task metrics (as given by the evaluation script above):

- **Tokenization**: **Tokens** F1 score
- **Sentence Segmentation**: **Sentences** F1 score
- **Lemmatization**: **Lemma** F1 score
- **POS Tagging**: **UPOS**, **XPOS** and **AllTags**  F1 scores
- **Dependency parsing**: **UAS** and **LAS** F1 scores


### Download from:

Download the treebank from [here](https://lindat.mff.cuni.cz/repository/xmlui/bitstream/handle/11234/1-3105/ud-treebanks-v2.5.tgz?sequence=1&isAllowed=y). Unzip the file.

### Starter code:

Not yet available, please download directly from source.

### Citation:

If you use this dataset in a published work, please cite the following:

> Joakim Nivre, Marie-Catherine de Marneffe, Filip Ginter, Yoav Goldberg, Jan Hajič, Christopher D. Manning, Ryan McDonald, Slav Petrov, Sampo Pyysalo, Natalia Silveira, Reut Tsarfaty, Daniel Zeman. 2016. Universal Dependencies v1: A Multilingual Treebank Collection. In Proceedings of LREC.
