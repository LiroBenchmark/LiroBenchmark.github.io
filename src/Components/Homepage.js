import React from 'react';
import DomainTile from './DomainTile';

const data = {
  "domains": [
    {
      "domain": "Text classification",
      "id": "text-classification",
      "tasks": [
        {
          "name": "Text classification",
          "id": "text-classification",
            "description": "Text classification is the task of assigning a sentence or document an appropriate category. The categories depend on the chosen dataset and can range from topics.",
            "submissions": 9,
            "datasets": 1
        },
        {
          "name": "Sentence classification",
          "id": "sentence-classification",
          "description": "Sentence classification is the task of assigning a sentence an appropriate category."
        }
      ]
    },
    {
      "domain": "Named entity recognition",
      "id": "named-entity-recognition",
      "tasks": [
        {
          "name": "Named entity recognition",
          "id": "named-entity-recognition",
            "description": "Named entity recognition (NER) is the task of tagging entities in text with their corresponding type. Approaches typically use BIO notation, which differentiates the beginning (B) and the inside (I) of entities. O is used for non-entity tokens.",
            "submissions": 15,
            "datasets": 3
        }
      ]
    }
  ]
};

const Homepage = () => {
    return (
        <>
	  {data.domains.map(item=>{
	      return(
                  <>
                    <DomainTile id={item.id} name={item.domain} tasks={item.tasks} />
		  </>
	      );
	  })}
        </>
    );
};

export default Homepage;
