/**
 * WordPress dependencies
 */

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { PanelBody, TextControl, ToggleControl } = wp.components;
const { InspectorControls } = wp.editor;
const {	registerBlockType } = wp.blocks;

const blockAttributes = {
	url: {
		type: 'string',
		default: '',
	},
	u: {
		type: 'string',
		default: '',
	},
	id: {
		type: 'string',
		default: '',
	},
    firstName: {
        type: 'boolean',
        default: false,
    },
    lastName: {
        type: 'boolean',
        default: false,
    },
};

export const name = 'occ/mailchimp';

export const settings = {
	title: __( 'Mailchimp', 'rather-simple-mailchimp' ),
	description: __( 'A Mailchimp form.', 'rather-simple-mailchimp' ),
	icon: 'email',
	category: 'common',
	keywords: [ __( 'email' ), __( 'newsletter' ) ],
	attributes: blockAttributes,

	edit: props => {
        const attributes = props.attributes;

        const setID = value => {
            props.setAttributes( { id: value } );
        };

        const setURL = value => {
            props.setAttributes( { url: value } );
        };

        const setU = value => {
            props.setAttributes( { u: value } );
        };

        const toggleFirstName = () => {
            props.setAttributes( { firstName: ! props.attributes.firstName } );
        };

        const toggleLastName = () => {
            props.setAttributes( { lastName: ! props.attributes.lastName } );
        };

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={ __( 'Mailchimp Settings', 'rather-simple-mailchimp' ) }>
                        <TextControl
                            label={ __( 'URL', 'rather-simple-mailchimp' ) }
                            type='url'
                            value={ attributes.url }
                            onChange={ setURL }
                        />
                        <TextControl
                            label={ __( 'U', 'rather-simple-mailchimp' ) }
                            type='text'
                            value={ attributes.u }
                            onChange={ setU }
                        />
                        <TextControl
                            label={ __( 'ID', 'rather-simple-mailchimp' ) }
                            type='text'
                            value={ attributes.id }
                            onChange={ setID }
                        />
                        { attributes.url && attributes.u && attributes.id && (
                            <ToggleControl
                                label={ __( 'Show First Name', 'rather-simple-mailchimp' ) }
                                checked={ !! attributes.firstName }
                                onChange={ toggleFirstName }
                            />
                        )}
                        { attributes.url && attributes.u && attributes.id && (
                            <ToggleControl
                            label={ __( 'Show Last Name', 'rather-simple-mailchimp' ) }
                            checked={ !! attributes.lastName }
                            onChange={ toggleLastName }
                            />
                        )}
                    </PanelBody>
                </InspectorControls>
                <div className={ props.className }>
                    <div id="mc_embed_signup">
                    { attributes.url && attributes.u && attributes.id ? (
                        <form action={ attributes.url  + "/subscribe/post?u=" + attributes.u  + "&id=" + attributes.id } method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
                            <div id="mc_embed_signup_scroll">
                                <div style={{position: 'absolute', left: '-5000px'}}>
                                    <input name={ "b_" + attributes.u + "_" + attributes.id } tabIndex={-1} value="" type="text" />
                                </div>
                                { attributes.firstName && (
                                    <div className="mc-field-group">
                                        <label htmlFor="mce-FNAME">{ __( 'first name:', 'rather-simple-mailchimp' ) }</label>
                                        <input value="" name="FNAME" className="required" id="mce-FNAME" type="text" />
                                    </div>
                                )}
                                { attributes.lastName && (
                                    <div className="mc-field-group">
                                        <label htmlFor="mce-LNAME">{ __( 'last name:', 'rather-simple-mailchimp' ) }</label>
                                        <input value="" name="LNAME" className="required" id="mce-LNAME" type="text" />
                                    </div>
                                )}
                                <div className="mc-field-group">
                                    <label htmlFor="mce-EMAIL">{ __( 'email:', 'rather-simple-mailchimp' ) }<span className="required">*</span></label>
                                    <input value="" name="EMAIL" className="required email" id="mce-EMAIL" type="email" />
                                </div>
                                <div className="mc-submit-button">
                                    <input value={ __( 'subscribe', 'rather-simple-mailchimp' ) } name="subscribe" id="mc-embedded-subscribe" className="button" type="submit" />
                                </div>
                                <div id="mce-responses" className="clear">
                                    <div className="response" id="mce-error-response" style={{display: 'none'}} />
                                    <div className="response" id="mce-success-response" style={{display: 'none'}} />
                                </div>
                            </div>
                        </form>
                    ) : (
                    <p>hola</p>
                    )}
                    </div>
                </div>
            </Fragment>
        );

    },

    save: props => {
        const attributes = props.attributes;

		return (
			<div className={ props.className }>
                <div id="mc_embed_signup">
                    { attributes.url && attributes.u && attributes.id && (
                        <form action={ attributes.url  + "/subscribe/post?u=" + attributes.u  + "&id=" + attributes.id } method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
                            <div id="mc_embed_signup_scroll">
                                <div style={{position: 'absolute', left: '-5000px'}}>
                                    <input name={ "b_" + attributes.u + "_" + attributes.id } tabIndex={-1} value="" type="text" />
                                </div>
                                { attributes.firstName && (
                                    <div className="mc-field-group">
                                        <label htmlFor="mce-FNAME">{ __( 'first name:', 'rather-simple-mailchimp' ) }</label>
                                        <input value="" name="FNAME" className="required" id="mce-FNAME" type="text" />
                                    </div>
                                )}
                                { attributes.lastName && (
                                    <div className="mc-field-group">
                                        <label htmlFor="mce-LNAME">{ __( 'last name:', 'rather-simple-mailchimp' ) }</label>
                                        <input value="" name="LNAME" className="required" id="mce-LNAME" type="text" />
                                    </div>
                                )}
                                <div className="mc-field-group">
                                    <label htmlFor="mce-EMAIL">{ __( 'email:', 'rather-simple-mailchimp' ) }<span className="required">*</span></label>
                                    <input value="" name="EMAIL" className="required email" id="mce-EMAIL" type="email" />
                                </div>
                                <div className="mc-submit-button">
                                    <input value={ __( 'subscribe', 'rather-simple-mailchimp' ) } name="subscribe" id="mc-embedded-subscribe" className="button" type="submit" />
                                </div>
                                <div id="mce-responses" className="clear">
                                    <div className="response" id="mce-error-response" style={{display: 'none'}} />
                                    <div className="response" id="mce-success-response" style={{display: 'none'}} />
                                </div>
                            </div>
                        </form>
                    )}
                </div>
			</div>
		);
	}

};

registerBlockType( name, settings );
