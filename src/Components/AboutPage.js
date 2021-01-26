import React from 'react';
import './AboutPage.scss';
import datasets_info from '../data/datasets.json';
import tasks_info from '../data/tasks.json';
import UrlBuilder from './UrlBuilder';

const AboutPage = () => (
  <>
    <h1>Who are we?</h1>
    <p>
      We are a group of Romanians with expertise in Machine Learning, NLP, linguistics, and data privacy. Our goal is to
      accelerate progress in AI research on Romanian language tasks.
    </p>
    <h1>
      What is the LiRo (<em>Limba Română</em>) project?
    </h1>
    <h2>Benchmark</h2>
    <p>
      LiRo provides a benchmark for Romanian language tasks. It contains {tasks_info.tasks.length} tasks on{' '}
      {datasets_info.datasets.length} datasets: {tasks_info.tasks.length} existing in the literature, {0} newly created
      through our team’s efforts.
    </p>
    <h2>Leaderboard</h2>
    <p>
      LiRo keeps track of performance of different published models on the datasets and tasks listed above. This allows
      easy comparison of different models and monitoring progress on these tasks and datasets over time.
    </p>
    <h2>Starter code</h2>
    <p>
      Contains scripts for downloading the datasets and computing various metrics for the tasks listed above. As this
      project is ongoing, we will add as soon as possible starter code for tasks that do not yet have it.
    </p>
    <h1>How can you contribute?</h1>
    <p>
      To add your model to the leaderboard, use the starter code to evaluate your model’s performance and{' '}
      <a href={UrlBuilder.submitPageUrl}>submit</a> your results, together with the paper and/or GitHub repo.
    </p>
    <p>
      If you have a relevant dataset that is not included, please contact us to see how we can add it to the
      leaderboard. The more the better.
    </p>
    <h1>Team</h1>
    <ul>
      <li>Adriana Stan, Associate Professor (Technical University of Cluj-Napoca)</li>
      <li>Andrei-Marius Avram, MSc student (Politehnica University of Bucharest)</li>
      <li>Andrei Pruteanu, NLP Independent Researcher</li>
      <li>Beáta Lőrincz, PhD student (”Babeș-Bolyai” University, Technical University of Cluj-Napoca)</li>
      <li>Cristina Victoria Iacobescu, Attorney-at-law, Reff & Associates (member of Deloitte Legal)</li>
      <li>Gabriel Marchidan, (Feel IT Services, AIRomania)</li>
      <li>George-Andrei Dima, MSc student (Politehnica University of Bucharest)</li>
      <li>Lorena Roșia, Attorney-at-law, Reff & Associates (member of Deloitte Legal)</li>
      <li>Luciana Morogan, Associate Professor (Military Technical Academy Ferdinand Bucharest)</li>
      <li>Madalina Chitez, Researcher (West University of Timisoara, CODHUS Research Centre)</li>
      <li>Mihai Ilie, (Politehnica University of Bucharest)</li>
      <li>Petru Rebeja, PhD student (Alexandru Ioan Cuza University of Iași, AIRomania)</li>
      <li>Radu Tudor Ionescu (University of Bucharest)</li>
      <li>Razvan Pascanu, Research Scientist (DeepMind, EEML, AIRomania)</li>
      <li>Ștefan Daniel Dumitrescu, NLP Independent Researcher</li>
      <li>Traian Rebedea, Associate Professor (Politehnica University of Bucharest)</li>
      <li>Viorica Patraucean, Research Scientist (DeepMind, EEML, AIRomania)</li>
    </ul>
  </>
);

export default AboutPage;
