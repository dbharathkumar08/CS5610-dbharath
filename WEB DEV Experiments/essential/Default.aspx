<%@ Page Language="C#" %>

<script runat="server">
    <%-- This demo page has no server side script --%>
</script>

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset='utf-8' />
    <title>Bharath kumar Dayananda</title>
    
    
    <link rel="stylesheet" href="css/HomePage.css">

</head>
<body>
<div id="header">
    <div id="name"><h3>Bharath kumar Dayananda</h3>
        <p>CS5610 - WEB DEVELOPMENT COURSE</p>
    </div>
</div>

<div id="links">

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

<div class="content">
    <div class="first_column fl">
        <div class="image"><img class="profile" src="images/bharath.jpg"></div>
        <div class="personal_info">
            <div class="contact_info h_divider">
                <p id="detail">M.S. in Computer Science<br/>
                    Northeastern University, Boston<br/>
                    dbharath@ccs.neu.edu<br/>
                    (+1)6692258733
                </p>
            </div> 
        </div>
    </div>
    <div class="second_column fl vl_divider">
        <div class="heading">About me:</div>
        <p id="content">   I am a Northeastern Student pursuing MS in Computer Science.
    This is my project website for Web Development course.
        </p>
       
    </div>
    <div class="third_column fl vl_divider h_divider">
        <div class="heading">Project Information:  </div>
        <div class="project_links h_divider">           
            <div class="project"><a href="https://github.com/dbharathkumar08/CS5610-dbharath" target="_blank"><p>GitHub Source Code</p></a></div>
            <div class="project"><a href="#" target="_blank"><p>Project</p></a></div>
            <div class="project_doc"><a href="#" target="_blank"><p>Project Documentation</p></a></div>
        </div>
    </div>  
</div>
    <div class="footer">
© 2015 Bharath kumar Dayananda - CS5610 Web Development course. All rights reserved.</div>



</body>
</html>
