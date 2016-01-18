import React from 'react/addons';
import Voting from '../../src/components/Voting';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag} = React.addons.TestUtils;

describe('Voting', () => {
    it('renders a pair of buttons', () => {
        const component = renderIntoDocument(
            <Voting pair={{"Mr. Nobody", "Frst Contact"}}/>
        );

        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(button.length).to.equal(2);
        expect(button[0].textContent).to.equal('Mr. Nobody');
        expect(button[1].textContent).to.equal('First Contact');
    });
});
