### Input, Output and Metrics:

Given the [fastText Romanian embeddings](https://github.com/facebookresearch/MUSE), the target is to maximize the Modified Word Embedding Association Test (`MWEAT`) score.

Please see the [paper describing the original debiasing experiment](https://arxiv.org/abs/1909.02224) for more info on `MWEAT`.

### Download from:

The embeddings file used is in the [embeeding_ro](https://github.com/LiroBenchmark/gender-bias/tree/main/embeddings_ro) directory; the feminine and masculine nouns are listed in the [data_ro](https://github.com/LiroBenchmark/gender-bias/tree/main/data_ro) directory.

### Starter code:

You can use the [Jupyter Notebook](https://github.com/LiroBenchmark/gender-bias/blob/main/bias_embed_ro.ipynb) as the starter code.

### Citation:

If you refer to this experiment in a published work, please cite the following:

>     @inproceedings{
>       liro2021,
>       title={LiRo: Benchmark and leaderboard for Romanian language tasks},
>       author={Stefan Daniel Dumitrescu and Petru Rebeja and Beata Lorincz and Mihaela Gaman and Andrei Avram and Mihai Ilie and Andrei Pruteanu and Adriana Stan and Lorena Rosia and Cristina Iacobescu and Luciana Morogan and George Dima and Gabriel Marchidan and Traian Rebedea and Madalina Chitez and Dani Yogatama and Sebastian Ruder and Radu Tudor Ionescu and Razvan Pascanu and Viorica Patraucean},
>       booktitle={Thirty-fifth Conference on Neural Information Processing Systems Datasets and Benchmarks Track (Round 1)},
>       year={2021},
>       url={https://openreview.net/forum?id=JH61CD7afTv}
>     }
