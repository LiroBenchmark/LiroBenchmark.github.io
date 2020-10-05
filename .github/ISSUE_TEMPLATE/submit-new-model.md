---
name: Submit new model
about: Form to submit a new model to the leaderboard
title: ''
labels: new submission
assignees: ''

---

## New model submission template

**Model name:** <please write here your model name; if you don't have a name, use the underlying models used; e.g.: BERT + MLP, or ELECTRA Ensemble, etc.>

**Task(s):** <please write here all tasks your model performs; e.g.: Sentence Segmentation, Part of Speech Tagging, etc.>
 
**Dataset(s):** <please write here all datasets your model trains on; e.g. UD Romanian RRT Treebank>

**External training data:** <write Yes if you used external training data, meaning *any* other data besides the dataset itself, otherwise write No>

**Model release date:** <the month and year you released/created the model; e.g. November 2020, or 2019-05>

**[Optional] Model size:** <number of parameters your model has, in millions>

**[Optional] Paper title:** <if you have a paper published, please input name here>

**[Optional] Paper link:** <input URL here; e.g. link to arxiv.org paper>

**[Optional] Source code:** <input link to Github or other code repository here>

### Results:

Please list one per line your model metrics/results, like: ``[Dataset], [Metric], [Value]``. For example, if you have a NER model with F1, Precision and Recall, you would write:
```
NER Dataset x, F1, 91.50
NER Dataset x, Precision, 92.00
NER Dataset x, Recall, 91.00
```

#### Other info:

If you have any other non-standard information that would help us speed up the check process, please write it here. For example, if you build a model that performs all the tasks in UD Romanian RRT Treebank, and each task is based on the previous one (like: first sentence segmentation & tokenization, then POS tagging, then parsing) then your model is an end-2-end system and needs to be marked as such. Or maybe you evaluate on a new metric that's not already present in the leaderboard. Please write here anything you feel is necessary.
