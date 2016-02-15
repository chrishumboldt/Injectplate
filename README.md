# Injectplate
A declare once Javascript component injector. This allows you to create HTML components and inject them into the DOM at will. In essence it is a wrapper for the awesome [Mustache.js](https://github.com/janl/mustache.js) library which has a great template sytax.

## Getting Started
You can either download a fresh copy of the source files or install Injectplate via Bower.

```
bower install injectplate
```

Simply start by including the required Javascript file.

```
<body>
   <script src="js/min/injectplate.js"></script>
</body>
```

Next initialize Injectplate before creating your first component.

```
<script>
// Initialize
var $inject = new injectplate();

// Create component
$inject.component({
   name: 'article',
   className: 'basic-article',
   html: [
      '<article>',
          '<h2>{{heading}}</h2>',
          '<div>{{content}}</div>',
      '</article>'
   ]
});
</script>
```

Once the component has been created, simple bind it to an element and parse in the relevant data.

```
<script>
// Call component
$inject.bind({
   component: 'article',
   to: '#article',
   data: {
      heading: 'Great Article Heading',
      content: 'This will just be some basic text about stuff.'
   }
});
</script>
```

## Component List
If you would like to know what components have been created simply call the component list function and view your console, like so:

```
<script>
$inject.componentList();
</script>
```

## Dynamic Data
Sometimes you might require elements to be generated dynamically and Injectplate can do this with a JSON based dataset. To do so modify the HTML option of the component, for example:

```
<script>
$inject.component({
	name: 'articleAdvanced',
	className: 'advanced-article',
	html: [
		'<article>',
			'<h2>{{heading}}</h2>',
			'<div class="content">',
				'{{#paragraphs}}',
					'<p>{{content}}</p>',
				'{{/paragraphs}}',
			'</div>',
		'</article>'
	]
});

$inject.bind({
	component: 'articleAdvanced',
	to: '#article',
	data: {
		heading: 'This Is An Advanced Article',
		paragraphs: [{
			content: 'This is paragraph one.'
		}, {
			content: 'Here goes the paragraph two.'
		}, {
			content: 'Finally the last paragraph goes here.'
		}]
	}
});
</script>
```

## On Done
Once the component has been injected you might want to execute some code. To do so apply the onDone event to your component or binding. Assigning the event to the component will execute it every time the component is bound, while assigning it to the binding will only call it on that particular binding instance.

Also note that the onDone function returns a **$this** variable which is the newly bound DOM element. This is an optional return on the callback.

```
<script>
// On component
$inject.bind({
	component: 'article',
	to: '#article',
	onDone: function($this) {
		console.log('This will output each time this component is used.');
	}
});

// On binding
$inject.bind({
	component: 'article',
	to: '#article',
	onDone: function($this) {
		console.log('The binding is done!');
	}
});
</script>
```


## Nesting Components
Note that you are also be able to bind again with the onDone function and nest components. In this case we want to inject some comments into the article component once it has already been injected itself.

```
<script>
// Create components
$inject.component({
	name: 'article',
	html: [
		'<article>',
			'<h2>{{heading}}</h2>',
			'<div>{{content}}</div>',
			'<div id="comments"></div>',
		'</article>'
	]
});
$inject.component({
	name: 'comments',
	html: [
		'<ul>',
			'{{#comments}}',
				'<li>{{text}} by {{author}}</li>',
			{{/comments}},
		'</ul>'
	]
});

// Call components
$inject.bind({
	component: 'article',
	to: '#article',
	data: {
		heading: 'Anther Great Article Heading',
		content: 'More arbitrary text goes here.'
	},
	onDone: function() {
		$inject.bind({
			component: 'comments',
			to: '#comments',
			data: {
				comments: [{
					text: 'I like this Javascript component',
					author: 'Greg McAwesome'
				}, {
					text: 'Let use this component in our next project',
					author: 'Bob Knowsitall'
				}]
			}
		});
	}
});
</script>
```

## Author
Created and maintained by Chris Humboldt<br>
Website: <a href="http://chrishumboldt.com/">chrishumboldt.com</a><br>
Twitter: <a href="https://twitter.com/chrishumboldt">twitter.com/chrishumboldt</a><br>
GitHub <a href="https://github.com/chrishumboldt">github.com/chrishumboldt</a><br>

## Copyright and License
Copyright 2015 HG Bolts

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
