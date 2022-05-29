### Description:

RO-STS-parallel, a parallel Romanian-English dataset is obtained by translating the English [STS](https://ixa2.si.ehu.eus/stswiki/index.php/STSbenchmark) dataset into Romanian. It contains 17256 sentences in Romanian and English. The data set is divided into three subsets: training (11498 sentence pairs), validation (3000 sentence pairs), test (2758 sentence pairs).

### Input, Output and Metrics:

The task is to translate a sentence from a source to a target language.

Given the train & validation sets, the target is to maximize the BLEU or ROUGE-L score on the test set.

The reported metric is the **BLEU or ROUGE-L score**.

### Download from:

[https://github.com/dumitrescustefan/RO-STS/](https://github.com/dumitrescustefan/RO-STS/)
[Direct download of dataset](https://github.com/dumitrescustefan/RO-STS/tree/master/dataset/ro-en)

### Starter code:

Not yet available, please download directly from source.

### Citation:

If you use this dataset in a published work, please cite the following:

>     @inproceedings{
>       liro2021,
>       title={LiRo: Benchmark and leaderboard for Romanian language tasks},
>       author={Stefan Daniel Dumitrescu and Petru Rebeja and Beata Lorincz and Mihaela Gaman and Andrei Avram and Mihai Ilie and Andrei Pruteanu and Adriana Stan and Lorena Rosia and Cristina Iacobescu and Luciana Morogan and George Dima and Gabriel Marchidan and Traian Rebedea and Madalina Chitez and Dani Yogatama and Sebastian Ruder and Radu Tudor Ionescu and Razvan Pascanu and Viorica Patraucean},
>       booktitle={Thirty-fifth Conference on Neural Information Processing Systems Datasets and Benchmarks Track (Round 1)},
>       year={2021},
>       url={https://openreview.net/forum?id=JH61CD7afTv}
>     }
