import Flight from 'flight';
import NameSpace from 'namespace';
import Events from 'events';
import GitHubComponent from 'components/data/github/github';
import FlowManagerComponent from 'FlowManager';
import UserSearchComponent from 'components/ui/user-search/user-search.js';
import UserListComponent from 'components/ui/user-list/user-list.js';
import UserBadgeComponent from 'components/ui/user-badge/user-badge.js';
import RepositoryListComponent from 'components/ui/repository-list/repository-list.js';
import RepositoryDetailsComponent from 'components/ui/repository-details/repository-details.js';
import usersTemplate from 'pages/users.html';
import repositoriesTemplate from 'pages/repositories.html';
import repositoryTemplate from 'pages/repository.html';

require('./app.scss');

// Debugger
Flight.Debugger.showEvents = true;
// Flight.Debugger.showView = true;
Flight.Debugger.init();

Flight.app(() => {
    // data components
    GitHubComponent.attachTo(NameSpace.GitHub);

    // ui components
    FlowManagerComponent.attachTo('flow-manager')
        .addStep({
            name: 'users',
            template: Flight.DOM.renderWithComponents(usersTemplate,
                UserSearchComponent, UserListComponent
            ),
        })
        .addStep({
            name: 'repositories',
            template: Flight.DOM.renderWithComponents(repositoriesTemplate,
                UserBadgeComponent, RepositoryListComponent
            ),
            nameSpace: NameSpace.GitHub,
            events: [ Events.User.Chosen ],
        })
        .addStep({
            name: 'repository',
            template: Flight.DOM.renderWithComponents(repositoryTemplate,
                UserBadgeComponent, RepositoryDetailsComponent
            ),
            nameSpace: NameSpace.GitHub,
            events: [ Events.Repository.Chosen ],
        })
        ;
});

// debugging
window.Flight = Flight;
NameSpace.GitHub.listen(
    Events.UserQuery.Error, event => {
        console.log(event);
    },
);
