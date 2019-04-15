const express = require("express");
const { data } = require("./data.json");
const { projects } = data;
const app = express();
//Set pug engine
app.set("view engine", "pug");
//App listen in port 3000
app.listen(3000, () => {
  console.log("App is runing");
});
//Middleware
app.use("/static", express.static("public"));
app.use("/images", express.static("images"));
//Index page
app.get("/", (req, res) => {
  const myproject = [];

  for (let i = 0; i < projects.length; i++) {
    myproject.push({
      project_id: projects[i].id,
      project_name: projects[i].project_name
    });
  }

  res.render("index", { myproject });
});
//About page
app.get("/about", (req, res) => {
  const myName = data.info[0].name;
  const mySkills = data.info[0].skills;
  const myContact = data.info[0].contactinfo;
  const myPortfolio = data.info[0].portfolio;
  const myPages = data.info[0].pages;

  res.render("about", { myName, mySkills, myContact, myPages, myPortfolio });
});
//Projects
app.get('/project/:id', (req, res, next) => {

  const id = req.params.id;
 
  if (id >= 0 && id <= projects.length) {
    const projectId = projects[id].id;
    const projectName = projects[id].project_name;
    const projectDes = projects[id].description;
    const projectTech = projects[id].technologies;
    const projectLink = projects[id].live_link;
    const projectGit = projects[id].github_link;
    const projectImages = projects[id].image_urls;

    res.render('project', { projectId, projectName, projectDes, projectTech, projectLink, projectGit, projectImages });
  } else {
    const err = new Error("Project not found");
    err.status = 404;
    next(err);
  }
});
//Redirect to first project
app.get('/project', (req, res) => {
  res.redirect('/project/0');
});
//Error catch
app.use((req, res, next) => {
  const err = new Error("This page does not exist");
  err.status = 404;
  next(err);
});
