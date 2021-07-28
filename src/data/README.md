# Adding a new system/paper to the leaderboard #

## Introduction/About ##
This file provides instructions on how to add a new system/paper to the leaderboard or change the values for the existing data.

At the start of this project, the data about the systems/models and the instructions for adding a new system/model were stored in an Excel workbook. Later we decided to split the Excel workbook into separate CSV files which prompted for the question of where to store the instructions, thus leading to the creation of this file.

## Why move from the Excel workbook to plain CSV files? ##
Although keeping the data in a single Excel workbook has its advantages (better user experience, everything in one place etc.), the problem with this approach is that we cannot track changes.

Furthermore, when two or more people are editing the Excel workbook in parallel, in the _best case_ they get a conflict and have to merge their changes. Merging changes in Excel workbook is tedious and makes the work of one persons redundant (the person resolving the merge conflict will have to do the same work while having to be more attentive to the details which are better known by the other person).

The _worst and more likely_ case is that the changes of one person will be overwritten by the changes of the other which will result in data loss.

However, even if the changes to the Excel workbook are coordinated such that the conflicts are avoided, there is still the issue of not being able to see _what_ changed in the file throughout its history.

CSV file solve the issue of tracking changes because they are text files, and as such they integrate well with the git system. Furthermore, it makes conflict resolution easier by allowing usage of git tooling to solve merge conflicts.

Of course, this functionality comes at the cost of loosing the advantages we had when using the Excel workbook: the data spreads across multiple files, and the user experience is heavily impacted. However, another advantage of CSV files is that they are easy to manipulate which opens the possibility of creating a GUI for adding new systems/papers in the future.

## Steps to add new system/paper ##

1. **Is the task already defined?**
   Check the [`./db/tasks.csv`](./db/tasks.csv) file and add the task there if it does not exist.
2. **Is the metric(s) already defined?**
   Check if the metric(s) used for the selected dataset is(are) defined in the [`./db/metrics.csv`](./db/metrics.csv) file.
3. **Is the dataset already defined?**
   Check the [`./db/datasets.csv`](./db/datasets.csv) file and add the dataset there if it does not exist.
4. **Add the model/system**
   Add your model/system in the [`./db/leaderboard.csv`](./db/leaderboard.csv) file; fill as much columns as possible.
5. **Add results**
   In the [`./db/results.csv`](./db/results.csv) add each result of your model/system one per line. _Make sure to fill all the columns_.
6. **Publish results**
   Create a Pull-Request with your changes and let the magic happen.
