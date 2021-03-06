var _jm = null;
function open_empty(){
    var options = {
        container:'jsmind_container',
        theme:'greensea',
        editable:true
    }
    _jm = jsMind.show(options);
    // _jm = jsMind.show(options,mind);
}

function open_ajax(){
    var mind_url = 'data_example.json';
    jsMind.util.ajax.get(mind_url,function(mind){
        _jm.show(mind);
    });
}

function screen_shot(){
    _jm.screenshot.shootDownload();
}

function get_nodearray_data(){
    var mind_data = _jm.get_data('node_array');
    var mind_string = jsMind.util.json.json2string(mind_data);
    prompt_info(mind_string);
}

function save_nodearray_file(){
    var mind_data = _jm.get_data('node_array');
    var mind_name = mind_data.meta.name;
    var mind_str = jsMind.util.json.json2string(mind_data);
    jsMind.util.file.save(mind_str,'text/jsmind',mind_name+'.json');
}


function open_nodearray(){
    var file_input = document.getElementById('file_input_nodearray');
    var files = file_input.files;
    if(files.length > 0){
        var file_data = files[0];
        jsMind.util.file.read(file_data,function(jsmind_data, jsmind_name){
            var mind = jsMind.util.json.string2json(jsmind_data);
            if(!!mind){
                _jm.show(mind);
            }else{
                prompt_info('can not open this file as mindmap');
            }
        });
    }else{
        prompt_info('please choose a file first')
    }
}

function select_node(){
    var nodeid = 'other';
    _jm.select_node(nodeid);
    document.getElementById('card-title').innerHTML = selected_node.topic
}

function show_selected(){
    var selected_node = _jm.get_selected_node();
    if(!!selected_node){
      //  prompt_info(selected_node.topic);
        

    }else{
        prompt_info('nothing');
    }
}

function get_selected_nodeid(){
    var selected_node = _jm.get_selected_node();
    if(!!selected_node){
        document.getElementById('card-title').innerHTML = selected_node.topic;
        return selected_node.id;
    }else{
        return null;
    }
}

function add_node(){
    var selected_node = _jm.get_selected_node(); // as parent of new node
    if(!selected_node){prompt_info('please select a node first.');return;}

    var nodeid = jsMind.util.uuid.newid();
    var topic = '* Node_'+nodeid.substr(nodeid.length-6)+' *';
    var node = _jm.add_node(selected_node, nodeid, topic);
}

var imageChooser = document.getElementById('image-chooser');

imageChooser.addEventListener('change', function (event) {
    // Read file here.
    var reader = new FileReader();
    reader.onloadend = (function () {
        var selected_node = _jm.get_selected_node();
        var nodeid = jsMind.util.uuid.newid();
        var topic = undefined;
        var data = {
            "background-image": reader.result,
            "width": "300",
            "height": "300"};
        var node = _jm.add_node(selected_node, nodeid, topic, data);
        //var node = _jm.add_image_node(selected_node, nodeid, reader.result, 100, 100);
    //add_image_node:function(parent_node, nodeid, image, width, height, data, idx, direction, expanded){
    });

    var file = imageChooser.files[0];
    if (file) {
        reader.readAsDataURL(file);
    };

}, false);

function add_image_node(){
    var selected_node = _jm.get_selected_node(); // as parent of new node
    if(!selected_node){
        prompt_info('please select a node first.');
        return;
    }

    imageChooser.focus();
    imageChooser.click();
}


function Upload_image(){
    $("#description-box").pasteUploadImage();
}

function modify_node(){
    var selected_id = get_selected_nodeid();
    if(!selected_id){prompt_info('please select a node first.');return;}

    // modify the topic
    _jm.update_node(selected_id, '--- modified ---');
}

function move_to_first(){
    var selected_id = get_selected_nodeid();
    if(!selected_id){prompt_info('please select a node first.');return;}

    _jm.move_node(selected_id,'_first_');
}

function move_to_last(){
    var selected_id = get_selected_nodeid();
    if(!selected_id){prompt_info('please select a node first.');return;}

    _jm.move_node(selected_id,'_last_');
}

function move_node(){
    // move a node before another
    _jm.move_node('other','open');
}

function remove_node(){
    var selected_id = get_selected_nodeid();
    if(!selected_id){prompt_info('please select a node first.');return;}

    _jm.remove_node(selected_id);
}

function change_text_font(){
    var selected_id = get_selected_nodeid();
    if(!selected_id){prompt_info('please select a node first.');return;}

    _jm.set_node_font_style(selected_id, 28);
}

function change_text_color(){
    var selected_id = get_selected_nodeid();
    if(!selected_id){prompt_info('please select a node first.');return;}

    _jm.set_node_color(selected_id, null, '#000');
}

function change_background_color(){
    var selected_id = get_selected_nodeid();
    if(!selected_id){prompt_info('please select a node first.');return;}

    _jm.set_node_color(selected_id, '#eee', null);
}

function change_background_image(){
    var selected_id = get_selected_nodeid();
    if(!selected_id){prompt_info('please select a node first.');return;}

    _jm.set_node_background_image(selected_id, 'ant.png', 100, 100);
}

function set_theme(theme_name){
    _jm.set_theme(theme_name);
}

var zoomInButton = document.getElementById("zoom-in");
var zoomOutButton = document.getElementById("zoom-out");

function zoomIn() {
    if (_jm.view.zoomIn()) {
        zoomOutButton.disabled = false;
    } else {
        zoomInButton.disabled = true;
    };
};

function zoomOut() {
    if (_jm.view.zoomOut()) {
        zoomInButton.disabled = false;
    } else {
        zoomOutButton.disabled = true;
    };
};

function save_card() {
    _jm.view.save_card();
};
function edit_card() {
    _jm.view.edit_card();
};
function d_input() {
    _jm.view.d_input();
};
function zoomscroll(){
    _jm.view_center_root;
}

// this method change size of container, perpare for adjusting jsmind
function change_container(){
    var c = document.getElementById('jsmind_container');
    c.style.width = '800px';
    c.style.height = '500px';
}

function resize_jsmind(){
    _jm.resize();
}

function expand(){
    var selected_id = get_selected_nodeid();
    if(!selected_id){prompt_info('please select a node first.');return;}

    _jm.expand_node(selected_id);
}

function collapse(){
    var selected_id = get_selected_nodeid();
    if(!selected_id){prompt_info('please select a node first.');return;}

    _jm.collapse_node(selected_id);
}

function toggle(){
    var selected_id = get_selected_nodeid();
    if(!selected_id){prompt_info('please select a node first.');return;}

    _jm.toggle_node(selected_id);
}

function expand_all(){
    _jm.expand_all();
}

function collapse_all(){
    _jm.collapse_all();
}

function prompt_info(msg){
    alert(msg);
}

$('#jsmind_container').bind('mousewheel', function(event) {
    if (event.originalEvent.wheelDelta >= 0) {
        _jm.view.zoomIn();
    }
    else {
        _jm.view.zoomOut();
    }
});

$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
    $("description").focus(function() {
        $(this).val("");
    });
});

/*
function upload(){
    var p=prompt("image URL:");
    if(p)
        formatText('InsertImage', p);
    return false; }

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function formatText(command, option) {
            displayImage(iframe);
            iframe.contentWindow.focus();
            try{
                iframe.contentWindow.document.execCommand(command, false, option);
            }catch(e){
                //console.log(e)
            }
            iframe.contentWindow.focus();
        };
function displayImage(iframe) {
            return iframe.contentWindow.document.getElementsById("card-content1")[0].innerHTML;
 }; */ // not actually working.
open_empty();