import Flight from 'flight';
import NameSpace from 'namespace';
import Events from 'events';
import jquery from 'jquery';

const GITHUB_SEARCH_URL = 'https://api.github.com/search/users';

class GitHubComponent extends Flight.DataComponent {

    listen() {
        this.on(NameSpace.GitHub).listen(
            Events.UserQuery.Request, event => this.queryUsers(event.query),
        );
    }

    queryUsers(query) {
        jquery.getJSON(
            GITHUB_SEARCH_URL,
            { q: query }
        ).done((response) => {
            this.on(NameSpace.GitHub).trigger(
                new Events.UserQuery.Response(response.items)
            );
        }).fail((error) => {
            this.on(NameSpace.GitHub).trigger(
                new Events.UserQuery.Error(error, query)
            );
        });
    }
}

export default GitHubComponent;