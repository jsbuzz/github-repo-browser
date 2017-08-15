import Flight from 'flight';
import NameSpace from 'namespace';
import Events from 'events';
import jquery from 'jquery';
import template from './user-badge.html';
import styles from './user-badge.scss';
const $ = jquery;


class UserBadgeComponent extends Flight.UIComponent {

    listen() {
        this.renderTemplate();

        this.on(NameSpace.GitHub).listen(
            Events.User.Chosen, event => this.loadUser(event.user),
        );

        this.ui().listen(
            'click', event => this.stepBack(),
        );
    }

    renderTemplate() {
        this.view.innerHTML = template;
    }

    loadUser(user) {
        $('img', this.view).attr('src', user.avatar_url);
        $('user-name', this.view).html('@' + user.login);
    }

    stepBack() {
        this.ui().trigger(
            new Events.Flow.StepBack()
        )
    }
}

export default UserBadgeComponent;