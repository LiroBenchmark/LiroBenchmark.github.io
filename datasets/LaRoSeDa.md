### Description:

LaRoSeDa, the Large Romanian Sentiment Data Set, contains 15000 product reviews written in Romanian. There are 7500 positive (star ratings 4 and 5) and 7500 negative (star ratings 1 and 2) reviews. The data set is divided into two subsets: training (12000 samples) and test (3000 samples). 

### Input, Output and Metrics:

The task is to classify each review according to its star rating. Given the training set, the target is to maximize the macro-averaged F1 score on the test set. 

The reported metric is the **Macro-averaged F1 score**.

### Download from:

[https://github.com/ancatache/LaRoSeDa](https://github.com/ancatache/LaRoSeDa)

### Starter code:

The following script loads the data samples into memory:

[https://github.com/ancatache/LaRoSeDa/blob/main/load_data_set.py](https://github.com/ancatache/LaRoSeDa/blob/main/load_data_set.py)

### Citation:

If you use this dataset in a published work, please cite the following:


> Anca Maria Tache, Mihaela Gaman, Radu Tudor Ionescu. "Clustering Word Embeddings with Self-Organizing Maps. Application on LaRoSeDa - A Large Romanian Sentiment Data Set". arXiv preprint arXiv:2101.04197, 2021. [Read the fulll paper](https://arxiv.org/abs/2101.04197).


or in .bibtex format:


>     @article{tache2021clustering,
>     title={Clustering Word Embeddings with Self-Organizing Maps. Application on LaRoSeDa--A Large Romanian Sentiment Data Set},
>     author={Tache, Anca Maria and Gaman, Mihaela and Ionescu, Radu Tudor},
>     journal={arXiv preprint arXiv:2101.04197},
>     year={2021}
>     }
