---
layout: default
title: Words
permalink: /blog
---

<div class="post">
    <div class="row">
        <div class="col-md-12 text-center">
            <header class="post-header">
                <h3 class="post-title">{{ page.title }}</h3>
            </header>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6 col-md-offset-3">
           <ul class="blog-index">
  {% for post in site.posts %}
    <li>
    	<div class="row">
        <div class="col-md-9">
            <a href="{{ post.url }}">{{ post.title }}</a>
        </div>
        <div class="col-md-3">
             <span class="date pull-right">{{ post.date | date: "%b %-d, %Y"  }}</span>
        </div>

    </div>

	<div class="row">
        <div class="col-md-12">
          {{ post.excerpt }}
      </div>

    </div>


    </li>
  {% endfor %}
</ul>
        </div>
    </div>


</div>


