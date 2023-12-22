var parentHtml = document.getElementById('dynamic_form').innerHTML;
var count = 1;
var divCount = 1;
var html = '';
const formData = {};

$(document).ready(function () {

    $('#add_field').on('click', function () {
        var tagLabelValue = $('input[name="options[]"]:checked').attr('tag_label');
        
        if (tagLabelValue && divCount == 1) {

            html = `<div id='form-id'><h3>Form Title</h3><input type='text' id='form-title' name='' placeholder='Enter Title?'></div>`;
            parentHtml = document.getElementById('dynamic_form').innerHTML + html;
            $('#dynamic_form').html(parentHtml);
        }

        if (tagLabelValue == "input") {
            html = `<div id=${divCount}><label>Field Label:</label>
                    <input type='text' id='question-${count}' name='quest' placeholder='Enter a Question?'>
                    <input type='text'></div>`;
            
            count = count + 1;
            divCount = divCount + 1;
            $('#addSubField').show();
        }
        else if (tagLabelValue == "select") {
            html = `<div id=${divCount} tag-type="select"><label>Field Label:</label>
                    <input type='text' id='select-field' name='field2' placeholder='Enter a field label'>
                    <input type='text' id='question-${count}' name='field2' placeholder='Enter a field Values comma Separated'>
                    </div>`;
            $('#select-values').show();
            count = count + 1;
            divCount = divCount + 1;
        }
        else if (tagLabelValue == "description") {
            html = `<div id=${divCount}><label>Field Label:</label>
                    <input type='text' id='question-${count}' name='field3' placeholder='Enter a field label'>
                    <textarea name="myTextarea" rows="4" cols="50">
                    Enter your text here...
                    </textarea></div>`;
            count = count + 1;
            divCount = divCount + 1;
        }
        else if (tagLabelValue == "button") {
            html = `<div id=${divCount}><button type="button">Create Form</button></div>`;
            count = count + 1;
            divCount = divCount + 1;
        }
        $('input[name="options[]"]:checked').prop('checked', false);
        
        parentHtml = document.getElementById('dynamic_form').innerHTML + html;
      
        $('#dynamic_form').html(parentHtml);

    });

    $('#select-values').on('click', function () {
        html = `<input type='text' id='question-${count}' name='options' placeholder='Enter value?'>`;

        var select_element = $('div[tag-type="select"]');

        select_element.append(html);
    });

    $('#addSubField').on('click', function () {
        var divElement = document.getElementById('dynamic_form');
      
        if (divElement.lastChild.childNodes[2].tagName.toLowerCase() == "input") {
            var inputElement = document.createElement('input');
            inputElement.type = 'text';
            inputElement.id = `question-${count}`;
            inputElement.placeholder = 'Enter text';
            divElement.lastChild.appendChild(inputElement);
            count = count + 1;
        }
        else if (tagLabelValue == "select") {
            console.log('2');
        }
        else if (tagLabelValue == "description") {
            console.log('3');

        }
        else if (tagLabelValue == "button") {
            console.log('4');
        }
        $('input[name="options[]"]:checked').prop('checked', false);
    });

    document.getElementById('submitBtn').addEventListener('click', function () {
        final_data = {};
        const questions = {};

        // Get the div element by its ID
        var divElement = document.getElementById('dynamic_form');

        // Get all form elements within the div
        var allDivs = divElement.getElementsByTagName('div');

        // Extract and log the IDs of the forms
        var allDivs = Array.from(allDivs).map(function (allDivs) {
            return allDivs.id;
        });

        var quesCount = 1;
        for (var i = 1; i < allDivs.length; i++) {

            // Find the div by id
            var parentDiv = document.getElementById(allDivs[i]);

            var selectElement = parentDiv.getAttribute('tag-type');

            if (selectElement != "select" && selectElement == null) {
                var parentDiv = document.getElementById(allDivs[i]);
                var elementsInsideDiv = parentDiv.querySelectorAll('*');


                // Iterate through the NodeList and get the IDs
                var ids = [];
                for (var j = 0; j < elementsInsideDiv.length; j++) {

                    var element = elementsInsideDiv[j];
                    var id = element.id;
                    if (id) {
                        ids.push(id);
                    }
                }

                var questionSet = [];

                //getting ids of inside div elements
                for (var j = 0; j < ids.length; j++) {

                    var Obj = {
                        type: document.getElementById(ids[j]).tagName.toLowerCase(),
                        value: document.getElementById(ids[j]).value
                    }

                    questionSet.push(Obj);

                }
                questions['question' + quesCount] = questionSet;

                quesCount = quesCount + 1;
            }
            else {
                var parentDiv = document.getElementById(allDivs[i]);
                var elementsInsideDiv = parentDiv.querySelectorAll('*');

                // Iterate through the NodeList and get the IDs
                var ids = [];
                for (var j = 0; j < elementsInsideDiv.length; j++) {
                    var element = elementsInsideDiv[j];
                    var id = element.id;
                    if (id) {
                        ids.push(id);
                    }
                }
                var questionSet = [];

                var options = [];
                //getting ids of inside div elements
                for (var j = 1; j < ids.length; j++) {
                    options.push(document.getElementById(ids[j]).value);
                }
                var Obj = {};
                Obj["type"] = "select";
                Obj["field"] = document.getElementById("select-field").value
                Obj["value"] = options;
                questionSet.push(Obj);
               

                questions['question' + quesCount] = questionSet;
                quesCount = quesCount + 1;

            }
        }

        final_data["title"] = document.getElementById('form-title').value;
        final_data["app_id"] = 118;
        final_data["questions"] = questions;

        divElement.innerHTML = '';

        fetch('save-data/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(final_data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Data saved successfully:', data);
            })
            .catch(error => {
                console.error('Error saving data:', error);
            });

    });

}); 