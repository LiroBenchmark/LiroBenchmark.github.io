### Input, Output and Metrics:

REDv2 is a multi-label classification task, meaning each tweet can be annotated with more than one emotion.
This task can be viewed as either a classification problem where a tweet either has or it does not have a label, or as a regression problem where the goal is to obtain the lowest MSE on the emotion vector. 

Given the train & validation sets, the target is to obtain the _lowest Hamming Loss_ in the _classification_ setting on the test set.

Metric reported is the **Hamming Loss**.

### Download from:

[https://github.com/Alegzandra/RED-Romanian-Emotions-Dataset/tree/main/REDv2](https://github.com/Alegzandra/RED-Romanian-Emotions-Dataset/tree/main/REDv2)

### Starter code:

Not yet available, please download directly from source.

### Citation:

If you use this dataset in a published work, please cite the following:

> Ciobotaru, A., Constantinescu, M. V., Dinu, L. P., & Dumitrescu, S. D. (2022). RED v2: Enhancing RED Dataset for Multi-Label Emotion Detection. Proceedings of the 13th Language Resources and Evaluation Conference (LREC 2022), 1392–1399

or in .bibtex format:

>   @inproceedings{redv2,
>     author = "Alexandra Ciobotaru and
>                  Mihai V. Constantinescu and
>                  Liviu P. Dinu and
>                  Stefan Daniel Dumitrescu",
>     title = "{RED} v2: {E}nhancing {RED} {D}ataset for {M}ulti-{L}abel {E}motion {D}etection",
>     journal = "Proceedings of the 13th Language Resources and Evaluation Conference (LREC 2022)",
>     pages = "1392–1399",
>     year = "2022",
>     address = "Marseille, France",
>     publisher = "European Language Resources Association (ELRA)",
>     url = "http://www.lrec-conf.org/proceedings/lrec2022/pdf/2022.lrec-1.149.pdf",
>     language = "English"
>   }
