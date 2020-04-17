//Simple function to go to blog specified by button
function GoToBlog(blogname){
    window.location = "blogpost.html?MyVar=" + blogname;
}
//JS implementation of hover effect used for blog post titles
function HoverEffect(isOn, blog){
    let image = document.getElementById(blog);
    if(isOn)
        image.style.opacity = '0.7';
    else
        image.style.opacity = '1.0';
}
