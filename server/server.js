const listmindmaps = async () => {
    try {
        const response = await axios.get('http://localhost:3002/mindmaps');
        var jsontostring = JSON.stringify(response.data);
        document.getElementById('test').innerHTML = jsontostring;
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

const listnodes = async () => {
    try {
        const response = await axios.get('http://localhost:3002/nodes');
        var jsontostring = JSON.stringify(response.data);
        document.getElementById('test1').innerHTML = jsontostring;
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};
