import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { getCurrentProfile, deleteAccount } from '../../actions/profileAction';
import { getCurrentProject } from '../../actions/projectAction';
import Loading from '../common/Loading';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AddProfileDetails } from './AddProfileDetails'
import Education  from './Education'
import Experience from './Experience'
import Project from './Project'

class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile();
        this.props.getCurrentProject();
    }

    onDelete(e) {
        this.props.deleteAccount();
    }

    render() {
        const { user } = this.props.auth;
        const { profile,loading } = this.props.profile;
        const { project } = this.props.project;
        let dashboardContent;
        let projectContent= "";
        if(profile==null || loading || project==null) {
            dashboardContent = <Loading />;
        } else {
            // dashboardContent = "Hello " + user.name
            if(Object.keys(project).length>0) {
                projectContent = (
                    <Project project={project} />
                )
            }
            if(Object.keys(profile).length>0) {
            dashboardContent = (
                <div>
                <p className="lead text-muted"><img
              src={user.avatar}
              alt={user.name}
              style={{ width: "105px", marginRight: "5px" }}
              title="You mush have your gravatar linked to your gmail"
              className="rounded-circle"
            /> Welcome <Link to={`/profile/${profile.username}`}>
                    {user.name}</Link></p>
                <br/>
                <AddProfileDetails/>
                <Experience experience={profile.experience} />
                <Education education={profile.education} />
                {projectContent}
                <div style={{marginBottom: '60px'}}>
                    <button onClick={this.onDelete.bind(this)} className="btn btn-danger">Delete My Account</button>
                </div>
                </div>
            )
            } else {
                dashboardContent = (
                    <div>
                        <p>Profile not yet created, please complete your Profile</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">
                            Create Profile
                        </Link>
                    </div>
                )
                
            }
        }
        return (
            <div>
             { dashboardContent }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
    project: state.project
})

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    getCurrentProject: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired

}

export default connect(mapStateToProps,{ getCurrentProfile, deleteAccount, getCurrentProject })(Dashboard);