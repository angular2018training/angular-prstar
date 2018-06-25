// Create from-to date input
// setupDatePickers("#field_startDate", '#field_endDate');
//setupDatePickers("#startDate", '#endDate');
const DISPLAY_FORMAT = 'mm.dd.yyyy';
const FORMAT_SUBMIT = 'yyyy/mm/dd';

/**
 * Init a date picker with multi affected date picker element
 * @param selector : selector of input using datepicker ( Id is required )
 * @param affectedDateSelectors : array object of affected date picker. 
 *  Ex :[{   
            'selector' : '#endDate', => affected selector
            'select' : {
                'constraint' : 'min', => constraint for select date picker
            },
            'clear' : {
                'constraint' : 'min', => constraint for clear date picker
                'value' : this.post.project.startDate => value for clear date picker ( default get value of selector )
            }
        }, ...]
 * @param selectedValue : default value of date picker, format : YYYY/MM/dd ( Ex : new Date(2015,1,18) )
 * @param defaultMinValue : default min value of date picker, format : YYYY/MM/dd ( Ex : new Date(2015,1,18) )
 * @param defaultMaxValue : default max value of date picker, format : YYYY/MM/dd
 * @event callback : callback function to get all array value datepicker, included main datepicker & affecteds datepicker, distinct by name of selector.   
 */

function initDatePicker(
    selector, 
    affectedDateSelectors, 
    callback, 
    selectedValue, 
    defaultMinValue, 
    defaultMaxValue = null
){
    var dt = $(selector).pickadate({
        format: DISPLAY_FORMAT,
        formatSubmit: FORMAT_SUBMIT
    });
    var control = dt.pickadate('picker');

    affectedDateSelectors.forEach(function(affected){
        if(affected.selector){
            $(affected.selector).pickadate({
                format: DISPLAY_FORMAT,
                formatSubmit: FORMAT_SUBMIT
            });
        }
    });

    if(selectedValue && selectedValue !== ''){
        control.set('select', selectedValue);
    }

    if(defaultMinValue && defaultMinValue !== ''){
        control.set('min', defaultMinValue);
    }

    if(defaultMaxValue && defaultMaxValue !== ''){
        control.set('max', defaultMaxValue);
    }
    // Affected
    control.on('set', function(e){
        affectedDateSelectors.forEach(function(affected){
            var controlAffected = $(affected.selector).pickadate('picker');
            if (e.select) {
                if(affected.select){
                    controlAffected.set(affected.select.constraint, control.get('select'));
                }
            }
            else if ('clear' in e) {
                if(affected.clear){
                    controlAffected.set(affected.select.constraint, affected.clear.value);
                }
            }
        });
        callback($(selector).val());
    });

}

function input(selector, input) {
    return input = $(selector).pickadate({
        format: DISPLAY_FORMAT,
        formatSubmit: 'yyyy/mm/dd',
    })
}

//TODO FIX ME
function initMinMax(from_picker, to_picker, bid_deadline_picker, decision_picker, projectStartDate, projectEndDate) {
    var today = new Date();
    from_picker.set('min', projectStartDate);
    from_picker.set('max', projectEndDate);
    to_picker.set('min', projectStartDate);
    to_picker.set('max', projectEndDate);
    if (new Date(projectStartDate) > today) {
        bid_deadline_picker.set('min', today);
        bid_deadline_picker.set('max', projectStartDate);
        decision_picker.set('min', today);
        decision_picker.set('max', projectStartDate);
    } else { //projectStartDate == today 
        bid_deadline_picker.set('min', projectStartDate);
        bid_deadline_picker.set('max', projectStartDate);
        decision_picker.set('min', projectStartDate);
        decision_picker.set('max', projectStartDate);
    }

    if (from_picker.get('value')) {
        to_picker.set('min', from_picker.get('select'));
        bid_deadline_picker.set('max', from_picker.get('select'));
        decision_picker.set('max', from_picker.get('select'));
    }

    if (to_picker.get('value')) {
        from_picker.set('max', to_picker.get('select'));
    }
}

// TODO FIX ME
function updateMinMax(from_picker, to_picker, bid_deadline_picker, decision_picker, startDateSelector, endDateSelector, bidDeadlineSelector, decisionDateSelector,
    startDateCallback, endDateCallback, bidDeadlineCallback, decisionDateCallback, projectStartDate, projectEndDate) {
    from_picker.on('set', function (event) {
        if (event.select) {
            to_picker.set('min', from_picker.get('select'));
            bid_deadline_picker.set('max', from_picker.get('select'));
        }
        else if ('clear' in event) {
            from_picker.set('min', projectStartDate)
            to_picker.set('min', projectStartDate);
        }
        startDateCallback($(startDateSelector).val());
    })

    to_picker.on('set', function (event) {
        if (event.select) {
            from_picker.set('max', to_picker.get('select'))
        }
        else if ('clear' in event) {
            from_picker.set('max', projectEndDate)
        }
        endDateCallback($(endDateSelector).val());
    })

    bid_deadline_picker.on('set', function (event) {
        if (event.select) {
            decision_picker.set('min', bid_deadline_picker.get('select'))
        }
        else if ('clear' in event) {
            decision_picker.set('min', projectStartDate)
        }
        bidDeadlineCallback($(bidDeadlineSelector).val());
    })

    decision_picker.on('set', function (event) {
        if (event.select) {
            bid_deadline_picker.set('max', decision_picker.get('select'))
        }
        else if ('clear' in event) {
            bid_deadline_picker.set('max', false)
        }
        decisionDateCallback($(decisionDateSelector).val());
    })
}
function convertDate(strDate) {
    var dateArray = strDate.split(".");
    return new Date(dateArray[2], dateArray[0] - 1, dateArray[1]);
}

function diffDate(strStart, strEnd) {
    var date1 = new Date(strStart);
    var date2 = new Date(strEnd);
    var diff = Math.abs(date1.getTime() - date2.getTime());
    return Math.ceil(diff / (1000 * 3600 * 24)); 
}

function showTooltip(titles) {
    $('#tooltip-bill-rate').tooltip('dispose');
    $('#tooltip-bill-rate').tooltip({
        template: '<div class="tooltip tooltip-bill-rate" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
        title: titles
    });
}

function initTooltip(id) {
    $(document).find(id).tooltip('dispose');
    $(document).find(id).tooltip();
}

 /**
 * Init a timepicker  
 */
function initTimePicker(
    selector,
    defaultValue,
    callback
){
    var el = $(selector).pickatime({
        default: defaultValue,
        autoclose: true,
        afterDone: function(){
            callback($(selector).val());
        }
    });
    callback($(selector).val());
}           