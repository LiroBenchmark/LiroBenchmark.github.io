'use strict';

const e = React.createElement;


class MenuComponent extends React.Component{
    constructor(props){
	super(props);
	this.menu=[
	    {
		text: "Code",
		url: 'https://github.com/eemlcommunity/ro_benchmark_leaderboard',
		target: "_blank",
		icon: "glyphicon-tasks"
	    },
	    {
		text: "Tasks",
		url: '#',
		target: "",
		icon: "glyphicon-list-alt"
	    },
	    {
		text: "Leaderboard",
		url: '#',
		target: "",
		icon: "glyphicon-equalizer"
	    },
	    {
		text: "Datasets",
		url: '#',
		target: "",
		icon: "glyphicon-hdd"
	    },
	    {
		text: "Submit",
		url: '#',
		target: "",
		icon: "glyphicon-cloud-upload"
	    },
	];
    }

    render(){
	console.log("rendering paper menu item");
	return e(
	    'ul',
	    {class: "nav navbar-nav navbar-right"},
	    [this.menu.map(function(item){
		return e(
		    'li',
		    null,
		    e(
			'a',
			{href:item.url, target:item.target},
			[
			    e(
				'span',
				{class:"glyphicon "+item.icon}
			    ),
			    item.text
			]
		    )
		);
	    })]);
    }
}


const domContainer = document.querySelector('#navigation');
ReactDOM.render(e(MenuComponent), domContainer);
