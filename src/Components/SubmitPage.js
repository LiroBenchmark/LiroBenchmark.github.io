import React from "react";
import "./SubmitPage.scss";
import Button from "react-bootstrap/Button";

const SubmitPage = (props) => {
  return (
    <>
      <h1 id="guide-on-how-to-submit-a-new-model">
        Guide on how to submit a new model
      </h1>
      <p>
        Submitting a new model to the leaderboard is easy! Simply{" "}
        <a href="https://github.com/eemlcommunity/ro_benchmark_leaderboard/issues/new/choose">
          create a new issue
        </a>{" "}
        and click on the <code>Get started</code> button to the right of the{" "}
        <code>Submit new model</code> template. Please fill in with all the info
        requested in the template, as well as all extra info you wish to let us
        know about your model. We’ll review your submission and add it to the
        leaderboard, that’s it!
      </p>
      <p>
        Here’s a step-by-step guide on how to add a new model. Let’s assume you
        have a new Named Entity Recognition (NER) model that you wish to submit;
        after starting a new model issue template, you’ll have to fill in a
        number of fields:
      </p>
      <ul>
        <li>
          <p>
            <code>Model name</code> Please write here your model name. If you
            didn’t name your model, you’d help the community a lot by writing
            here the underlying models/methods used. For example, if your NER
            model model is based on a BERT and a CRF on top, please write it as{" "}
            <code>BERT + CRF</code>. Or if it is an ensemble of LSTMs, write{" "}
            <code>RNN Ensemble</code>, etc.
          </p>
        </li>
        <li>
          <p>
            <code>Task(s)</code> Please write here the task that your model
            participates in. For example, you would write here <code>NER</code>
          </p>
        </li>
        <li>
          <p>
            <code>Dataset(s)</code> Please write here the datasets your model
            trains/runs on. For example{" "}
            <code>RONEC - Romanian Named Entity Corpus v1</code>. Please list
            here <strong>all</strong> the datasets you have run your model on.
          </p>
        </li>
        <li>
          <p>
            <code>External training data</code> Yes/No if your model was trained
            on external data. Any training data that is <em>not</em> in the
            dataset you are submitting results to, and you have used to train
            your model on, will automatically lead to a <code>Yes</code> at this
            question. <em>Note</em>: pretrained transformers (or any other
            general, non-task/dataset oriented pretraining) does not count as
            external training data.
          </p>
        </li>
        <li>
          <p>
            <code>Model size</code> <em>[Optional]</em> Please write here the
            number of parameters in millions. Eg, if you used a BERT-base and a
            CRF, you’d probably write <code>110M</code>. It’s very easy to count
            the number of parameters. Practically, in all current ML plaforms,
            getting this number is one line of code.
          </p>
        </li>
        <li>
          <p>
            <code>Paper title</code> <em>[Optional]</em> If you have a published
            paper, list name here.
          </p>
        </li>
        <li>
          <p>
            <code>Paper link</code> <em>[Optional]</em> input URL here;
            e.g. link to arxiv.org paper&gt;
          </p>
        </li>
        <li>
          <p>
            <code>Source code</code> <em>[Optional]</em> input link to Github or
            other code repository here&gt;
          </p>
        </li>
        <li>
          <p>
            <code>Results</code>: Please list your model’s metrics/results, one
            per line, like: <code>[Dataset], [Metric], [Value]</code>.
          </p>
        </li>
      </ul>
      <h2 id="example-submission">Example submission:</h2>
      <pre>
        <code>
          Model name: BERT + CRF
          <br />
          Task(s): NER
          <br />
          Dataset(s): RONEC - Romanian Named Entity Corpus v1
          <br />
          External training data: No
          <br />
          Model size: 110M
          <br />
          Paper title: (no paper yet)
          <br />
          Paper link: -
          <br />
          Source code: http://github.com/username/my_ner_repo
          <br />
          <br />
          Results:
          <br />
          RONEC - Romanian Named Entity Corpus v1, F1, 91.50
          <br />
          RONEC - Romanian Named Entity Corpus v1, Precision, 92.00
          <br />
          RONEC - Romanian Named Entity Corpus v1, Recall, 91.00
        </code>
      </pre>
      <h2 id="other-considerations">Other considerations:</h2>
      <ul>
        <li>
          If you have sumbitted a model to this leaderboard,{" "}
          <strong>but</strong> your paper was not published at the time, reopen
          the issue an let us know about the paper (title + link). Similarly,
          reopen your issue regarding source code availability, or any other
          changes you need to make to your submission.
        </li>
      </ul>
      <hr />
      <Button
        variant="primary"
        href="https://github.com/eemlcommunity/ro_benchmark_leaderboard/issues/new/choose"
      >
        Submit your model
      </Button>
    </>
  );
};

export default SubmitPage;
