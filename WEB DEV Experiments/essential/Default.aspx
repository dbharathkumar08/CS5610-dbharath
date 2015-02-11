<%@ Page Language="C#" %>

<script runat="server">
    <%-- This demo page has no server side script --%>
</script>

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset='utf-8' />

<title>Demo Home Page</title>

<style type="text/css">
    ul.master_navigation
    {
        font-size: 100%;
        font-weight: bold;
        text-align: center;
        list-style: none;
        margin: 0.5em 0;
        padding: 0;
    }

    ul.master_navigation li
    {
        display: inline-block;
        padding: 0 0.5%;
    }

    a
    {
        color: #08f;
        font-weight: bold;
        text-decoration: none;
    }

    a:visited
    {
        color: #88f;
    }

    a:hover
    {
        color: #f00;
    }

    p
    {
        text-align: justify;
    }
</style>

<style type="text/css" media="screen">
    body {
        width:900px;
        max-width: 100%;
        margin: 0;
        padding: 0;
        background-image:url(images/background.jpg);
        text-emphasis-color:red;
    }

    .pad {
        padding: 10px;
    }
    .intro{
        color:red;
    }
</style>

</head>

<body>

<div class="pad">

<form id="form1" runat="server">

<div>

<ul class="master_navigation">
    <li><a href="sitestatistics/" target="_blank">SiteStatistics</a></li>
    <li><a href="statistics/" target="_blank">Statistics</a></li>
    <li><a href="source/" target="_blank">Source</a></li>
    <li><a href="search/" target="_blank">Search</a></li>
    <li><a href="searchtree/" target="_blank">SearchTree</a></li>
    <li><a href="textview/" target="_blank">TextView</a></li>
    <li><a href="filelist.aspx" target="_blank">FileList</a></li>
    <li><a href="autofile.aspx" target="_blank">AutoFile</a></li>
    <li><a href="images/autoimage.aspx" target="_blank">Images</a></li>
    <li><a href="blog/" target="_blank">Blog</a></li>
    <li><a href="story/index.htm?../experiments/story.txt" target="_blank">Experiments</a></li>
</ul>

<hr />



<hr />

<p class="intro">
    
    I am a Northeastern Student pursuing MS in Computer Science.
    This is my project website for Web Development course.
</p>

<hr />

<p>
    <img src="images/bharath.jpg"  height="400" width="400"> 
    
</p>
    
<hr />

    <p>
Here is the link to my
<a href="https://github.com/dbharathkumar08/CS5610-dbharath" target="_blank">Git Hub </a>
This Link takes you to my GitHub Repository
</p>

<p>
Here is a link to the
<a href="story/index.htm" target="_blank">Story Utility</a>
on this site so that you may explore this tool.
</p>

<p>
Here is a link to the
<a href="http://www.northeastern.edu/rasala/webstories.htm"
        target="_blank">Web Development Stories</a>
so that you may see a good collection of online documentation.
</p>



<hr />

</div>

</form>

</div>

</body>
</html>
