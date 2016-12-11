<?php

class My_Simple_Mailchimp_Widget extends WP_Widget {
	
	/**
	 * Constructor.
	 */
	function __construct() {
		$widget_ops = array('classname' => 'my_simple_mailchimp_widget', 'description' => __('A simple Mailchimp widget', 'my-simple-mailchimp'));
		$control_ops = array('width' => 400, 'height' => 350);
		parent::__construct('msmw', __('My Simple Mailchimp widget', 'my-simple-mailchimp'), $widget_ops, $control_ops);
	}

	/**
	 * Output widget.
	 *
	 * @see WP_Widget
	 *
	 * @param array $args
	 * @param array $instance
	 */
	function widget( $args, $instance ) {
		extract($args);
		$title = apply_filters( 'widget_title', empty($instance['title']) ? '' : $instance['title'], $instance );
		$url = untrailingslashit( empty($instance['url']) ? '' : $instance['url'] );
		$u = empty($instance['u']) ? '' : $instance['u'];
		$id = empty($instance['id']) ? '' : $instance['id'];
		
		echo $before_widget;
		
		if (!empty( $title )) { 
			echo $before_title . $title . $after_title;
		};

		$html = '<!-- Begin MailChimp Signup Form -->
			<div id="mc_embed_signup">
			<form action="' . esc_attr($url) . '/subscribe/post?u=' . esc_attr($u) . '&amp;id=' . esc_attr($id) .'" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
			<div id="mc_embed_signup_scroll">
				<div style="position: absolute; left: -5000px;"><input type="text" name="b_' . esc_attr($u) . '_' . esc_attr($id) . '" tabindex="-1" value=""></div>
				<div class="mc-field-group">
					<label for="mce-EMAIL">' . __('email:', 'my-simple-mailchimp') . '<span class="required">*</span></label>
					<input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
				</div>
				<div class="mc-submit-button">
					<input type="submit" value="' . __('subscribe', 'my-simple-mailchimp') . '" name="subscribe" id="mc-embedded-subscribe" class="button">
				</div>
				<div id="mce-responses" class="clear">
					<div class="response" id="mce-error-response" style="display:none"></div>
					<div class="response" id="mce-success-response" style="display:none"></div>
				</div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
			</div>
			</form>
		</div>
		<!--End mc_embed_signup-->';
		
		echo $html;

		echo $after_widget;
	}

	/**
	 * Updates a particular instance of a widget.
	 *
	 * @see    WP_Widget->update
	 * @param  array $new_instance
	 * @param  array $old_instance
	 * @return array
	 */
	function update( $new_instance, $old_instance ) {
		$instance = $old_instance;
		$instance['title'] = strip_tags($new_instance['title']);
		$instance['url'] = strip_tags($new_instance['url']);
		$instance['u'] = strip_tags($new_instance['u']);
		$instance['id'] = strip_tags($new_instance['id']);
		return $instance;
	}

	/**
	 * Outputs the settings update form.
	 *
	 * @see   WP_Widget->form
	 * @param array $instance
	 */
	 function form( $instance ) {
		$instance = wp_parse_args( (array) $instance, array( 'title' => '', 'url' => '', 'u' => '', 'id' => '' ) );
		$title = strip_tags($instance['title']);
		$url = strip_tags($instance['url']);
		$u = strip_tags($instance['u']);
		$id = strip_tags($instance['id']);
		
		?>
			<p>
			<label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title:', 'my-simple-mailchimp'); ?></label>
			<input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo esc_attr($title); ?>" />
			</p>
			<p>
			<label for="<?php echo $this->get_field_id('url'); ?>"><?php _e('URL:', 'my-simple-mailchimp'); ?></label>
			<input class="widefat" id="<?php echo $this->get_field_id('url'); ?>" name="<?php echo $this->get_field_name('url'); ?>" type="text" value="<?php echo esc_attr($url); ?>" />
			</p>
			<p>
			<label for="<?php echo $this->get_field_id('u'); ?>"><?php _e('U:', 'my-simple-mailchimp'); ?></label>
			<input class="widefat" id="<?php echo $this->get_field_id('u'); ?>" name="<?php echo $this->get_field_name('u'); ?>" type="text" value="<?php echo esc_attr($u); ?>" />
			</p>
			<p>
			<label for="<?php echo $this->get_field_id('id'); ?>"><?php _e('ID:', 'my-simple-mailchimp'); ?></label>
			<input class="widefat" id="<?php echo $this->get_field_id('id'); ?>" name="<?php echo $this->get_field_name('id'); ?>" type="text" value="<?php echo esc_attr($id); ?>" />
			</p>
		<?php
	}
}

add_action('widgets_init', create_function('', 'return register_widget("My_Simple_Mailchimp_Widget");'));