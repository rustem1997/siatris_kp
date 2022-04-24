import React from "react";
import "./App.css";

import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import UserList from "./components/User/UserList";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import Footer from "./components/Footer";
import Home from "./components/Home";
import SecurityServiceComponent from "./components/SecurityServiceComponent";

import Profile from "./components/User/Profile";
import UserProfile from "./components/User/UserProfile";

import CreateEmployerComponent from './components/User/CreateEmployerComponent';

import CreateUpdateUserComponent from './components/User/CreateUpdateUserComponent';
import CreateUpdateAccountImageComponent from './components/UserInformation/CreateUpdateAccountImageComponent';
import CreateUserInformationComponent from './components/UserInformation/CreateUserInformationComponent';
import ListUserComponent from './components/User/ListUserComponent';

import CreateUpdateSummaryComponent from './components/Summary/CreateUpdateSummaryComponent';
import ViewSummaryComponent from "./components/Summary/ViewSummaryComponent";

import CreateUpdateCompanyComponent from './components/Company/CreateUpdateCompanyComponent';
import CreateUpdateCompanyImage from "./components/Company/CreateUpdateCompanyImage";
import ListCompanyComponent from './components/Company/ListCompanyComponent'
import ViewCompanyComponent from "./components/Company/ViewCompanyComponent";
import ViewCompanyForEmployerComponent from "./components/Company/forEmployer/ViewCompanyForEmployerComponent";

import CreateUpdateVacancyComponent from './components/vacancy/CreateUpdateVacancyComponent';
import ViewVacancyComponent from './components/vacancy/ViewVacancyComponent';
import ListVacancyComponent from './components/vacancy/ListVacancyComponent';
import ViewVacancyForUserComponent from './components/vacancy/ViewVacancyForUserComponent';

import CompanyEmployersComponent from './components/Company/CompanyEmployersComponent';

import CreateUpdateRecommendationComponent from './components/Recommendation/CreateUpdateRecommendationComponent';
import ViewRecommendationComponent from './components/Recommendation/ViewRecommendationComponent';
import ListRecommendationForEmployer from './components/Recommendation/ListRecommendationForEmployer';
import ListVacancyUserComponent from './components/VacancyUser/ListVacancyUserComponent';
import ListOfReplyComponent from './components/vacancy/ListOfReplyComponent';
import InterviewUserListComponent from './components/interview/InterviewUserListComponent';
import ViewInterViewComponent from './components/interview/ViewInterViewComponent';
import CreateInterviewComponent from './components/interview/CreateInterviewComponent';

const App = () => {
  window.onbeforeunload = (event) => {
    const e = event || window.event;
    e.preventDefault();
    if (e) {
      e.returnValue = "";
    }
    return "";
  };

  return (
    <Router>
      <NavigationBar />
      <Container>
        <Row>
          <Col lg={12} className={"margin-top"}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/home" exact component={Home} />
              <Route path="/home/:id" exact component={Home} />
              <Route path="/vacancy/:id" exact component={ListVacancyComponent} />
              <Route path="/interview-list/:id" exact component={InterviewUserListComponent} />

              <Route path="/security-service" component={SecurityServiceComponent} />

              <Route path="/update-user/:idUser/:role" component={CreateUpdateUserComponent} />
              <Route path="/users" component={ListUserComponent} />

              <Route path="/usersList" exact component={UserList} />
              <Route path="/profile/:idUser/:role" exact component={Profile} />
              <Route path="/user-profile-page/:idUser" exact component={UserProfile} />
              <Route path="/user-profile-page/:idUser/:idEmployer" exact component={UserProfile} />

              <Route path="/add-employer-company/:companyId" component={CreateEmployerComponent} />

              <Route path="/create-account-image/:idUserInformation/:idUser/:role" component={CreateUpdateAccountImageComponent} />
              
               <Route path="/create-user-information/:idUser/:role" component={CreateUserInformationComponent} />
               <Route path="/update-user-information/:userInformationId/:idUser/:role" component={CreateUserInformationComponent} />

               <Route path="/view-summary/:summaryId/:idUser/:role" exact component={ViewSummaryComponent} />
               <Route path="/view-summary-admin/:summaryId/:idUser" exact component={ViewSummaryComponent} />

               <Route path="/create-summary/:idUser/:role" component={CreateUpdateSummaryComponent} />
               <Route path="/update-summary/:summaryId/:idUser/:role" component={CreateUpdateSummaryComponent} />

               <Route path="/create-company" component={CreateUpdateCompanyComponent} />
               <Route path="/create-company-image/:companyId" component={CreateUpdateCompanyImage} />
               <Route path="/companies" exact component={ListCompanyComponent} />
               <Route path="/view-company/:companyId" exact component={ViewCompanyComponent} />
               <Route path="/update-company/:companyId" component={CreateUpdateCompanyComponent} />
               <Route path="/company/employer/:idEmployer" exact component={ViewCompanyForEmployerComponent} />

               <Route path="/create-vacancy/:idCompany/:idEmployer" component={CreateUpdateVacancyComponent} />
               <Route path="/update-vacancy/:idCompany/:vacancyId/:idEmployer" component={CreateUpdateVacancyComponent} />
               <Route path="/view-vacancy/:idCompany/:vacancyId" exact component={ViewVacancyComponent} />
               <Route path="/view-vacancy-employer/:idCompany/:vacancyId/:idEmployer" exact component={ViewVacancyComponent} />
               <Route path="/view-emplyer/:idCompany/:idUser" exact component={Profile} />
               <Route path="/view-company-employer/:idCompany" exact component={CompanyEmployersComponent} />
               <Route path="/view-vacancy-user/:vacancyId/:idUser" exact component={ViewVacancyForUserComponent} />
               <Route path="/view-vacancy-user-interview/:interviewId/:idUser" exact component={ViewInterViewComponent} />
               <Route path="/view-vacancy-employer-interview/:interviewId/:idEmployer/:companyId/:vacancyId" exact component={ViewInterViewComponent} />


               <Route path="/create-recommendation/:idUser/:idEmployer" exact component={CreateUpdateRecommendationComponent} />
               <Route path="/recommendations/:employerId" exact component={ListRecommendationForEmployer} />
               <Route path="/update-recommendation/:idRecommendation/:idEmployer" component={CreateUpdateRecommendationComponent} />
               <Route path="/view-recommendation/:idRecommendation/:idEmployer" exact component={ViewRecommendationComponent} />
               <Route path="/view-recommendation/:idRecommendation/:idUser/:role" exact component={ViewRecommendationComponent} />
               <Route path="/view-recommendation-admin/:idRecommendation/:idUser" exact component={ViewRecommendationComponent} />
               <Route path="/view-vacancy-user-employer/:vacancyId/" exact component={ListVacancyUserComponent} />
               <Route path="/create-interview/:idUser/:idEmployer/:idVacancy/:idCompany" exact component={CreateInterviewComponent} />

               <Route path="/reply/:idUser/" exact component={ListOfReplyComponent} />


              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <Route
                path="/logout"
                exact
                component={() => (
                  <Login message="User Logged Out Successfully." />
                )}
              />
            </Switch>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
