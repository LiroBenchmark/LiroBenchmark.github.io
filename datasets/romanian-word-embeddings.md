### Input, Output and Metrics:

Given the first 1 million embeddings, the target is to maximize the Modified Word Embedding Association Test (`MWEAT`) score.

Please see the [paper describing the original debiasing experiment](https://arxiv.org/abs/1909.02224) for more info on `MWEAT`.

### Download from:

The embeddings file used is in the [embeeding_ro](https://github.com/LiroBenchmark/gender-bias/tree/main/embeddings_ro) directory; the feminine and masculine nouns are listed in the [data_ro](https://github.com/LiroBenchmark/gender-bias/tree/main/data_ro) directory.

### Starter code:

You can use the [Jupyter Notebook](https://github.com/LiroBenchmark/gender-bias/blob/main/bias_embed_ro.ipynb) as the starter code.

### Citation:

If you refer to this experiment in a published work, please cite the following:


> Dumitrescu, S. D., Rebeja, P., Lorincz, B., Gaman, M., Avram, A., Ilie, M., ... & Patraucean, V. (2021). LiRo: Benchmark and leaderboard for Romanian language tasks.


or in .bibtex format:


>     @article{liro2021,
>       title={LiRo: Benchmark and leaderboard for Romanian language tasks},
>       author={Dumitrescu, Stefan Daniel and Rebeja, Petru and Lorincz, Beata and Gaman, Mihaela and Avram, Andrei and Ilie, Mihai and Pruteanu, Andrei and Stan, Adriana and Rosia, Lorena and Iacobescu, Cristina and others},
>       year={2021}
>     }
