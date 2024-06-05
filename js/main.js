const today = moment();
const startDate = '04/04/2024'
const openDatePicker = document.querySelectorAll('.open-datepicker-js')

openDatePicker.forEach((ele, index) => {
  const datePicker = $(ele).daterangepicker({
    "autoApply": true,
    startDate: startDate,
    minDate: startDate,
    maxDate: today,
    opens: 'left',
  });

  datePicker.on('apply.daterangepicker', function (ev, picker) {
    displayDate(picker, index)

    let from = picker.startDate.format('YYYY/MM/DD')
    let to = picker.endDate.format('YYYY/MM/DD')

    console.log('send data:', from, to)
  })
})

const dateFroms = document.querySelectorAll('.date-from-js')
const dateTos = document.querySelectorAll('.date-to-js')

function displayDate(picker, index) {
  $(dateFroms[index]).html(picker.startDate.format('DD/MM/YYYY'));
  $(dateTos[index]).html(picker.endDate.format('DD/MM/YYYY'));
}

const popperBtns = document.querySelectorAll('.popper-btn-js');
const popperContents = document.querySelectorAll('.popper-content');

popperBtns.forEach((item, i) => {
  const popperInstance = Popper.createPopper(item, popperContents[i], {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });
  function show() {
    // Make the tooltip visible
    popperContents[i].setAttribute('data-show', '');

    // Enable the event listeners
    popperInstance.setOptions((options) => ({
      ...options,
      modifiers: [
        ...options.modifiers,
        { name: 'eventListeners', enabled: true },
      ],
    }));

    // Update its position
    popperInstance.update();
  }

  function hide() {
    // Hide the tooltip
    popperContents[i].removeAttribute('data-show');

    // Disable the event listeners
    popperInstance.setOptions((options) => ({
      ...options,
      modifiers: [
        ...options.modifiers,
        { name: 'eventListeners', enabled: false },
      ],
    }));
  }

  const showEvents = ['mouseenter', 'focus'];
  const hideEvents = ['mouseleave', 'blur'];

  showEvents.forEach((event) => {
    item.addEventListener(event, show);
  });

  hideEvents.forEach((event) => {
    item.addEventListener(event, hide);
  });
})