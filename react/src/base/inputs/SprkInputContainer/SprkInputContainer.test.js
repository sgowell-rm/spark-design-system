import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SprkInputContainer from './SprkInputContainer';
import SprkLabel from '../SprkLabel/SprkLabel';
import SprkInput from '../SprkInput/SprkInput';
import SprkErrorContainer from '../SprkErrorContainer/SprkErrorContainer';
import SprkFieldError from '../SprkFieldError/SprkFieldError';
import SprkHelperText from '../SprkHelperText/SprkHelperText';
import SprkDatePicker from '../SprkDatePicker/SprkDatePicker';
import SprkIcon from '../../../components/icons/SprkIcon';

Enzyme.configure({ adapter: new Adapter() });

describe('SprkInputContainer Class Tests:', () => {
  it('should render an element with the correct class', () => {
    const wrapper = mount(<SprkInputContainer />);
    expect(wrapper.find('.sprk-b-InputContainer').length).toBe(1);
  });

  it('should render a huge text input container with the correct class', () => {
    const wrapper = mount(<SprkInputContainer variant="huge" />);
    expect(
      wrapper
        .find('.sprk-b-InputContainer')
        .hasClass('sprk-b-InputContainer--huge'),
    ).toBe(true);
  });

  it('should not add huge class if variant is not huge', () => {
    const wrapper = mount(<SprkInputContainer />);
    expect(
      wrapper
        .find('.sprk-b-InputContainer')
        .hasClass('sprk-b-InputContainer--huge'),
    ).toBe(false);
  });

  it('should add classes when additionalClasses has a value', () => {
    const wrapper = mount(
      <SprkInputContainer additionalClasses="sprk-u-man" />,
    );
    expect(wrapper.find('.sprk-b-InputContainer.sprk-u-man').length).toBe(1);
  });
});

describe('SprkInputContainer Data Attribute Tests:', () => {
  it('should assign data-analytics when analyticsString has a value', () => {
    const wrapper = mount(<SprkInputContainer analyticsString="321" />);
    expect(wrapper.find('[data-analytics="321"]').length).toBe(1);
  });

  it(`should not render data-analytics when
  analyticsString is not present`, () => {
    const wrapper = mount(<SprkInputContainer />);
    expect(wrapper.find('[data-analytics]').length).toBe(0);
  });

  it('should assign data-id when idString has a value', () => {
    const wrapper = mount(<SprkInputContainer idString="321" />);
    expect(wrapper.find('[data-id="321"]').length).toBe(1);
  });

  it('should not render data-id when idString is not present', () => {
    const wrapper = mount(<SprkInputContainer />);
    expect(wrapper.find('[data-id]').length).toBe(0);
  });
});

describe('SprkInputContainer ID/htmlFor Tests:', () => {
  it('should set for value of label to match input id if mismatching', () => {
    const wrapper = mount(
      <SprkInputContainer>
        <SprkLabel htmlFor="testFor">Mismatching Values</SprkLabel>
        <SprkInput id="testID" />
      </SprkInputContainer>,
    );
    expect(wrapper.find('label').getDOMNode().htmlFor).toBe('testID');

    const customFor = mount(
      <SprkInputContainer>
        <SprkLabel>With custom for</SprkLabel>
        <SprkInput id="testID" />
      </SprkInputContainer>,
    );
    expect(customFor.find('label').getDOMNode().htmlFor).toBe('testID');

    const customID = mount(
      <SprkInputContainer>
        <SprkLabel htmlFor="testFor">Input has custom ID</SprkLabel>
        <SprkInput />
      </SprkInputContainer>,
    );
    expect(customID.find('label').getDOMNode().htmlFor).toBe(
      customID.find('input').getDOMNode().id,
    );

    const bothCustom = mount(
      <SprkInputContainer>
        <SprkLabel>Input has custom ID</SprkLabel>
        <SprkInput />
      </SprkInputContainer>,
    );
    expect(bothCustom.find('label').getDOMNode().htmlFor).toBe(
      bothCustom.find('input').getDOMNode().id,
    );

    const bothMatch = mount(
      <SprkInputContainer>
        <SprkLabel htmlFor="match">htmlFor and id Match</SprkLabel>
        <SprkInput id="match" />
      </SprkInputContainer>,
    );
    expect(bothMatch.find('input').getDOMNode().id).toBe('match');
    expect(bothMatch.find('label').getDOMNode().htmlFor).toBe('match');
  });

  it(`should set for value of label to match
  input id if mismatching on grandchildren`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <div className="sprk-b-InputContainer__icon-container">
          <SprkLabel htmlFor="testFor">Mismatching Values</SprkLabel>
          <SprkInput id="testID" />
        </div>
      </SprkInputContainer>,
    );
    expect(wrapper.find('label').getDOMNode().htmlFor).toBe('testID');

    const customFor = mount(
      <SprkInputContainer>
        <div className="sprk-b-InputContainer__icon-container">
          <SprkLabel>With custom for</SprkLabel>
          <SprkInput id="testID" />
        </div>
      </SprkInputContainer>,
    );
    expect(customFor.find('label').getDOMNode().htmlFor).toBe('testID');

    const customID = mount(
      <SprkInputContainer>
        <div className="sprk-b-InputContainer__icon-container">
          <SprkLabel htmlFor="testFor">Input has custom ID</SprkLabel>
          <SprkInput />
        </div>
      </SprkInputContainer>,
    );
    expect(customID.find('label').getDOMNode().htmlFor).toBe(
      customID.find('input').getDOMNode().id,
    );

    const bothCustom = mount(
      <SprkInputContainer>
        <div className="sprk-b-InputContainer__icon-container">
          <SprkLabel>Input has custom ID</SprkLabel>
          <SprkInput />
        </div>
      </SprkInputContainer>,
    );
    expect(bothCustom.find('label').getDOMNode().htmlFor).toBe(
      bothCustom.find('input').getDOMNode().id,
    );

    const bothMatch = mount(
      <SprkInputContainer>
        <div className="sprk-b-InputContainer__icon-container">
          <SprkLabel htmlFor="match">htmlFor and id Match</SprkLabel>
          <SprkInput id="match" />
        </div>
      </SprkInputContainer>,
    );
    expect(bothMatch.find('input').getDOMNode().id).toBe('match');
    expect(bothMatch.find('label').getDOMNode().htmlFor).toBe('match');
  });
});
describe('SprkInputContainer aria-describedby Tests:', () => {
  it(`should add the helperTextID to the aria-describedby
  on the input if it isn't present`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <SprkLabel>Input Label</SprkLabel>
        <SprkInput />
        <SprkHelperText id="test-id" />
      </SprkInputContainer>,
    );

    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('test-id');
  });

  it(`should add the errorContainerID to the aria-describedby
  on the input if it isn't present`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <SprkLabel>Input Label</SprkLabel>
        <SprkInput />
        <SprkErrorContainer id="test-id" message="test message" />
      </SprkInputContainer>,
    );

    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('test-id');
  });

  it(`should add the fieldErrorID to the aria-describedby
  on the input if it isn't present`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <SprkLabel>Input Label</SprkLabel>
        <SprkInput />
        <SprkFieldError id="test-id" />
      </SprkInputContainer>,
    );

    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('test-id');
  });

  it(`should allow additional values be passed to the aria-describedby`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <SprkLabel>Input Label</SprkLabel>
        <SprkInput ariaDescribedBy="additional-value" />
        <SprkFieldError id="test-id" />
      </SprkInputContainer>,
    );

    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('additional-value test-id');
  });

  it(`should add helperTextID and fieldErrorID to the
  aria-describedby if neither are present`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <SprkLabel>Input Label</SprkLabel>
        <SprkInput />
        <SprkFieldError id="test-error-id" />
        <SprkHelperText id="test-helper-id" />
      </SprkInputContainer>,
    );

    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('test-helper-id test-error-id');
  });

  it(`should add helperTextID and errorContainerID to the
  aria-describedby if neither are present`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <SprkLabel>Input Label</SprkLabel>
        <SprkInput />
        <SprkErrorContainer message="test message" id="test-error-id" />
        <SprkHelperText id="test-helper-id" />
      </SprkInputContainer>,
    );

    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('test-helper-id test-error-id');
  });

  it(`should add helperTextID and fieldErrorID to the
  aria-describedby if neither are present and keep additional values`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <SprkLabel>Input Label</SprkLabel>
        <SprkInput ariaDescribedBy="additional-value" />
        <SprkFieldError id="test-error-id" />
        <SprkHelperText id="test-helper-id" />
      </SprkInputContainer>,
    );

    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('additional-value test-helper-id test-error-id');
  });

  it(`should add helperTextID and errorContainerID to the
  aria-describedby if neither are present and keep additional values`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <SprkLabel>Input Label</SprkLabel>
        <SprkInput ariaDescribedBy="additional-value" />
        <SprkErrorContainer message="test message" id="test-error-id" />
        <SprkHelperText id="test-helper-id" />
      </SprkInputContainer>,
    );

    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('additional-value test-helper-id test-error-id');
  });

  it(`should not add helperTextID and errorContainerID to the
  aria-describedby if both are present and keep additional values`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <SprkLabel>Input Label</SprkLabel>
        <SprkInput ariaDescribedBy="value test-helper-id test-error-id" />
        <SprkErrorContainer message="test message" id="test-error-id" />
        <SprkHelperText id="test-helper-id" />
      </SprkInputContainer>,
    );

    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('value test-helper-id test-error-id');
  });

  it(`should not add helperTextID and fieldErrorID to the
  aria-describedby if both are present and keep additional values`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <SprkLabel>Input Label</SprkLabel>
        <SprkInput ariaDescribedBy="value test-helper-id test-error-id" />
        <SprkFieldError id="test-error-id" />
        <SprkHelperText id="test-helper-id" />
      </SprkInputContainer>,
    );

    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('value test-helper-id test-error-id');
  });

  it(`should not add helperTextID to the 
  aria-describedby if it's present`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <SprkLabel>Input Label</SprkLabel>
        <SprkInput ariaDescribedBy="test-helper-id" />
        <SprkHelperText id="test-helper-id" />
      </SprkInputContainer>,
    );

    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('test-helper-id');
  });

  it(`should not add errorContainerID to the 
  aria-describedby if it's present`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <SprkLabel>Input Label</SprkLabel>
        <SprkInput ariaDescribedBy="test-id" />
        <SprkErrorContainer message="test message" id="test-id" />
      </SprkInputContainer>,
    );

    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('test-id');
  });

  it(`should not add fieldErrorID to the 
  aria-describedby if it's present`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <SprkLabel>Input Label</SprkLabel>
        <SprkInput ariaDescribedBy="test-id" />
        <SprkFieldError id="test-id" />
      </SprkInputContainer>,
    );

    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('test-id');
  });

  it(`should not add aria-describedby to the input
  if there is no helper or error text`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <SprkLabel>Input Label</SprkLabel>
        <SprkInput />
      </SprkInputContainer>,
    );

    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe(null);
  });

  it(`should add the helperTextID to the aria-describedby
  on the datepicker in an icon-container if it isn't present`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <div className="sprk-b-InputContainer__icon-container">
          <SprkLabel>Input Label</SprkLabel>
          <SprkDatePicker />
        </div>
        <SprkHelperText id="test-id" />
      </SprkInputContainer>,
    );

    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('test-id');
  });

  it(`should add the errorContainerID to the aria-describedby
  on the datepicker in an icon-container if it isn't present`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <div className="sprk-b-InputContainer__icon-container">
          <SprkLabel>Input Label</SprkLabel>
          <SprkDatePicker />
        </div>
        <SprkErrorContainer id="test-id" message="test message" />
      </SprkInputContainer>,
    );

    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('test-id');
  });

  it(`should add the fieldErrorID to the aria-describedby
  on the datepicker in an icon-container if it isn't present`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <div className="sprk-b-InputContainer__icon-container">
          <SprkLabel>Input Label</SprkLabel>
          <SprkDatePicker />
        </div>
        <SprkFieldError id="test-id" />
      </SprkInputContainer>,
    );

    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('test-id');
  });

  it(`should allow additional values be passed to the
  aria-describedby on a datepicker in an icon-container`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <div className="sprk-b-InputContainer__icon-container">
          <SprkLabel>Input Label</SprkLabel>
          <SprkDatePicker ariaDescribedBy="additional-value" />
        </div>
        <SprkFieldError id="test-id" />
      </SprkInputContainer>,
    );

    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('additional-value test-id');
  });

  it(`should add helperTextID and fieldErrorID to the
  aria-describedby if neither are present on a datepicker
  in an icon-container`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <div className="sprk-b-InputContainer__icon-container">
          <SprkLabel>Input Label</SprkLabel>
          <SprkDatePicker />
        </div>
        <SprkFieldError id="test-error-id" />
        <SprkHelperText id="test-helper-id" />
      </SprkInputContainer>,
    );

    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('test-helper-id test-error-id');
  });

  it(`should add helperTextID and errorContainerID to the
  aria-describedby if neither are present on a datepicker
  in an icon-container`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <div className="sprk-b-InputContainer__icon-container">
          <SprkLabel>Input Label</SprkLabel>
          <SprkDatePicker />
        </div>
        <SprkErrorContainer message="test message" id="test-error-id" />
        <SprkHelperText id="test-helper-id" />
      </SprkInputContainer>,
    );

    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('test-helper-id test-error-id');
  });

  it(`should add helperTextID and fieldErrorID to the aria-describedby
  if neither are present and keep additional values on a datepicker
  in an icon-container`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <div className="sprk-b-InputContainer__icon-container">
          <SprkLabel>Input Label</SprkLabel>
          <SprkDatePicker ariaDescribedBy="additional-value" />
        </div>
        <SprkFieldError id="test-error-id" />
        <SprkHelperText id="test-helper-id" />
      </SprkInputContainer>,
    );

    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('additional-value test-helper-id test-error-id');
  });

  it(`should add helperTextID and errorContainerID to the aria-describedby
  if neither are present and keep additional values on a datepicker
  in an icon-container`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <div className="sprk-b-InputContainer__icon-container">
          <SprkLabel>Input Label</SprkLabel>
          <SprkDatePicker ariaDescribedBy="additional-value" />
        </div>
        <SprkErrorContainer message="test message" id="test-error-id" />
        <SprkHelperText id="test-helper-id" />
      </SprkInputContainer>,
    );

    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('additional-value test-helper-id test-error-id');
  });

  it(`should not add helperTextID and errorContainerID to the aria-describedby
  if both are present and keep additional values on a datepicker
  in an icon-container`, () => {
    /* eslint-disable max-len */
    const wrapper = mount(
      <SprkInputContainer>
        <div className="sprk-b-InputContainer__icon-container">
          <SprkLabel>Input Label</SprkLabel>
          <SprkDatePicker ariaDescribedBy="value test-helper-id test-error-id" />
        </div>
        <SprkErrorContainer message="test message" id="test-error-id" />
        <SprkHelperText id="test-helper-id" />
      </SprkInputContainer>,
    );
    /* eslint-enable max-len */

    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('value test-helper-id test-error-id');
  });

  it(`should not add helperTextID and fieldErrorID to the aria-describedby
  if both are present and keep additional values on a datepicker
  in an icon-container`, () => {
    /* eslint-disable max-len */
    const wrapper = mount(
      <SprkInputContainer>
        <div className="sprk-b-InputContainer__icon-container">
          <SprkLabel>Input Label</SprkLabel>
          <SprkDatePicker ariaDescribedBy="value test-helper-id test-error-id" />
        </div>
        <SprkFieldError id="test-error-id" />
        <SprkHelperText id="test-helper-id" />
      </SprkInputContainer>,
    );
    /* eslint-enable max-len */
    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('value test-helper-id test-error-id');
  });

  it(`should not add helperTextID to the
  aria-describedby if it's present on a datepicker
  in an icon-container`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <div className="sprk-b-InputContainer__icon-container">
          <SprkLabel>Input Label</SprkLabel>
          <SprkDatePicker ariaDescribedBy="test-helper-id" />
        </div>
        <SprkHelperText id="test-helper-id" />
      </SprkInputContainer>,
    );

    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('test-helper-id');
  });

  it(`should not add errorContainerID to the
  aria-describedby if it's present on a datepicker
  in an icon-container`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <div className="sprk-b-InputContainer__icon-container">
          <SprkLabel>Input Label</SprkLabel>
          <SprkDatePicker ariaDescribedBy="test-id" />
        </div>
        <SprkErrorContainer message="test message" id="test-id" />
      </SprkInputContainer>,
    );

    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('test-id');
  });

  it(`should not add fieldErrorID to the
  aria-describedby if it's present on a datepicker
  in an icon-container`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <div className="sprk-b-InputContainer__icon-container">
          <SprkLabel>Input Label</SprkLabel>
          <SprkDatePicker ariaDescribedBy="test-id" />
        </div>
        <SprkFieldError id="test-id" />
      </SprkInputContainer>,
    );

    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe('test-id');
  });

  it(`should not add aria-describedby to the input
  if there is no helper or error text on a
  datepicker in an icon-container`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <div className="sprk-b-InputContainer__icon-container">
          <SprkLabel>Input Label</SprkLabel>
          <SprkDatePicker />
        </div>
      </SprkInputContainer>,
    );

    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe(null);
  });

  it(`should not add aria-describedby to the input
  if there is error text on a
  datepicker it's the child of a non-icon-container`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <div>
          <SprkLabel>Input Label</SprkLabel>
          <SprkDatePicker />
        </div>
        <SprkFieldError id="test-id" />
      </SprkInputContainer>,
    );

    expect(
      wrapper.find('input').getDOMNode().getAttribute('aria-describedby'),
    ).toBe(null);
  });
});
describe('SprkInputContainer Additional Elements Tests:', () => {
  it('should allow other elements to be passed through', () => {
    const wrapper = mount(
      <SprkInputContainer>
        <SprkLabel htmlFor="testFor">Mismatching Values</SprkLabel>
        <SprkInput id="testID" />
        <p>Additional Information Passed</p>
      </SprkInputContainer>,
    );
    expect(wrapper.find('p').length).toBe(1);
  });

  it(`should pass through additional grandchildren`, () => {
    const wrapper = mount(
      <SprkInputContainer>
        <div className="sprk-b-InputContainer__icon-container">
          <SprkLabel>Input Label</SprkLabel>
          <SprkIcon
            iconName="calendar"
            additionalClasses="
              sprk-c-Icon--stroke-current-color
              sprk-b-InputContainer__icon"
            aria-hidden="true"
          />
          <SprkDatePicker ariaDescribedBy="test-id" />
        </div>
      </SprkInputContainer>,
    );

    expect(wrapper.find('svg').length).toBe(1);
  });
});
