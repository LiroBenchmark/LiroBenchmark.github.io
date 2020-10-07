# Guide on how to submit a new model

**Submitting a new model to the leaderboard is easy! Simply create a new issue and click on the ``Get started`` button to the right of the ``Submit new model`` template. Please fill in with all the info requested in the template, as well as all extra info you wish to let us know about your model. We'll review your submission and add it to the leaderboard, that's it!**

Here's a step-by-step guide on how to add a new model. Let's assume you have a new Named Entity Recognition (NER) model that you wish to submit; after starting a new model issue template, you'll have to fill in a number of fields:

* ``Model name`` Please write here your model name. If you didn't name your model, you'd help the community a lot by writing here the underlying models/methods used. For example, if your NER model model is based on a BERT and a CRF on top, please write it as ``BERT + CRF``. Or if it is an ensemble of LSTMs, write ``RNN Ensemble``, etc.

* ``Task(s)`` Please write here the task that your model participates in. For example, you would write here ``NER``

* ``Dataset(s)`` Please write here the datasets your model trains/runs on. For example ``RONEC - Romanian Named Entity Corpus v1``. Please list here **all** the datasets you have run your model on.

* ``External training data`` Yes/No if your model was trained on external data. Any training data that is *not* in the dataset you are submitting results to, and you have used to train your model on, will automatically lead to a ``Yes`` at this question. _Note_: pretrained transformers (or any other general, non-task/dataset oriented pretraining) does not count as external training data.  

* ``Model size`` _[Optional]_ Please write here the number of parameters in millions. Eg, if you used a BERT-base and a CRF, you'd probably write ``110M``. It's very easy to count the number of parameters. Practically, in all current ML plaforms, getting this number is one line of code.

*  ``Paper title`` _[Optional]_ If you have a published paper, list name here.

* ``Paper link`` _[Optional]_ input URL here; e.g. link to arxiv.org paper>

* ``Source code`` _[Optional]_ input link to Github or other code repository here>

* ``Results``: Please list your model's metrics/results, one per line, like: ``[Dataset], [Metric], [Value]``. 

#### Example submission:


```
Model name: BERT + CRF
Task(s): NER
Dataset(s): RONEC - Romanian Named Entity Corpus v1
External training data: No
Model size: 110M
Paper title: (no paper yet)
Paper link: -
Source code: http://github.com/username/my_ner_repo

Results: 
RONEC - Romanian Named Entity Corpus v1, F1, 91.50
RONEC - Romanian Named Entity Corpus v1, Precision, 92.00
RONEC - Romanian Named Entity Corpus v1, Recall, 91.00
```


### Other considerations:

* If you have sumbitted a model to this leaderboard, **but** your paper was not published at the time, reopen the issue an let us know about the paper (title + link). Similarly, reopen your issue regarding source code availability, or any other changes you need to make to your submission.
