document.addEventListener('DOMContentLoaded', function()
{
    function history_section ()
    {
        let histories_slider = tns({
            container: '.js-histories-slider',
            items: 3,
            gutter: 24,
            prevButton: '.js-history-prev',
            nextButton: '.js-history-next',
            nav: false,
        });

        function change_btn (btn)
        {
            let text = ''

            if (btn.classList.contains('-active'))
            {
                text = btn.getAttribute('data-disable-text');
            }

            else
            {
                text = btn.getAttribute('data-active-text');
            }

            btn.innerHTML = text;
            btn.classList.toggle('-active')
        }

        let btns = document.querySelectorAll('.js-history-change');

        for (i = 0; i < btns.length; i++)
        {
            btns[i].addEventListener('click', function (){
                let parent = this.closest('.js-result-container');
                let result = parent.querySelector('.js-result-images');
                result.classList.toggle('-active');
                change_btn (this);
            });
        }
    }

    function doctors_section () {
        let doctors_slider = tns({
            container: '.js-doctors-slider',
            items: 1,
            gutter: 0,
            prevButton: '.js-doctors-prev',
            nextButton: '.js-doctors-next',
            nav: false,
        });
    }

    function services_section () {
        let buttons = document.querySelectorAll('.js-services-toggle');

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function (){
                let section = buttons[i].getAttribute('data-target');

                document.querySelector('.js-services-section.-open').classList.remove('-open');
                document.querySelector('.js-services-toggle.-active').classList.remove('-active');

                document.querySelector('#' + section).classList.add('-open');
                buttons[i].classList.add('-active');
            });
        }
    }

    function header () {
        let header = document.querySelector('.js-header');
        let nav = document.querySelector('.js-nav');

        function change_header_style () {
            if (window.scrollY > 0) {
                nav.classList.add('-non-transparent');
                header.classList.add('-page-scrolled');
            }

            else {
                nav.classList.remove('-non-transparent');
                header.classList.remove('-page-scrolled');
            }
        }
        
        change_header_style ();

        document.addEventListener('scroll', change_header_style);
    }

    function phone_mask () {
        let script = document.querySelector('#input-mask');

        script.addEventListener('load', function() {
            let inputs = document.querySelectorAll ('.js-phone-mask');

            for (let i = 0; i < inputs.length; i++) {
                IMask(inputs[i], {
                    mask: '+{7}(000)000-00-00',
                    lazy: true,
                    placeholderChar: '_'
                })
            }
        });
    }

    function modals () {
        let target = document.querySelectorAll('[data-modal-show]');

        for (let i = 0; i < target.length; i++) {
            target[i].addEventListener('click', function (){
                let modal_id = target[i].getAttribute('data-modal-show');
                document.querySelector('[data-modal="' + modal_id + '"]').classList.add('-active');
            });
        }

        let closed_button = document.querySelectorAll('[data-closed-modal]');

        for (let i = 0; i < closed_button.length; i++) {
            closed_button[i].addEventListener('click', function (){
                closed_button[i].closest('[data-modal]').classList.remove('-active');
            });
        }

        let modals = document.querySelectorAll('[data-modal');

        for (let i = 0; i < modals.length; i++) {
            modals[i].addEventListener('click', function (evt) {
                if (evt.target.hasAttribute('data-modal')) {
                    modals[i].classList.remove('-active');
                }
            });
        }
    }

    function tooltip_modal() {
        let btns = document.querySelectorAll('.js-tooltip-modal-target');

        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', function () {
                let tooltip_name = btns[i].getAttribute('data-tooltip-modal-show'); 
                document.querySelector('[data-tooltip-modal="' + tooltip_name + '"]').classList.add('-active');
            });
        }

        let closed_btn = document.querySelectorAll('[data-tooltip-modal-closed]');

        for (let i = 0; i < closed_btn.length; i++) {
            closed_btn[i].addEventListener('click', function () {
                closed_btn[i].closest('[data-tooltip-modal]').classList.remove('-active');
            });
        }
    }

    history_section ();
    doctors_section ();
    services_section ();
    header ();
    phone_mask ();
    modals ();
    tooltip_modal();
});