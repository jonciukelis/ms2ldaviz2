import os
import io
import pickle
import json

from werkzeug.utils import secure_filename

from flask import Flask, Response, send_from_directory, render_template, request, redirect, flash, jsonify, url_for


app = Flask(__name__, static_url_path='', template_folder='views')
app.config.from_mapping(
    SECRET_KEY='very_secret_word',
    DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
)


def dePandas(lda):
    # Remove Pandas artifacts in lda file.
    gamma = lda.pop("gamma")
    alpha = lda.pop("alpha")
    ngamma = []
    nalpha = []
    for thing in gamma:
        ngamma.append(float(thing))
    for thing in alpha:
        nalpha.append(float(thing))
    lda["alpha"] = nalpha
    lda["gamma"] = ngamma
    return lda

# Index
@app.route('/')
def main():
    return redirect(url_for('react_main'))

# Server React application
@app.route('/react/')
def react_main():
    return send_from_directory('react/build', "index.html")


@app.route('/react/<path:path>')
def send_react(path):
    return send_from_directory('react/build', path)


@app.route('/example/')
def example_json():
    return send_from_directory('', "example.json")

@app.route('/example2/')
def example2_json():
    return send_from_directory('', "example2.json")

@app.route('/exampledict/')
def example_lda():
    return send_from_directory('', "example.dict")

# Server React static and media
@app.route('/static/js/<path:path>')
def send_js(path):
    return send_from_directory('react/build/static/js', path)


@app.route('/static/css/<path:path>')
def send_css(path):
    return send_from_directory('react/build/static/css', path)

@app.route('/mass_spec_project/<path:path>')
def massbank(path):
    return send_from_directory('mass_spec_project', path)


# @app.route('/static/media/<path:path>')
# def send_media(path):
#     return send_from_directory('react/build/static/media', path)

# Legacy api endpoints
@app.route('/decode/', methods=['POST'])
def dict_to_json():
    if request.method == 'POST':
        # Check if the post request has the file part
        if 'file' not in request.files:
            return jsonify("Error: no file attached to request")
        file = request.files['file']
        if file.filename == '':
            return jsonify("Error: no file attached to request")
    s = file
    try:
        lda = pickle.load(s, encoding='latin1')  # For python 2.7 pickles
    except:
        return jsonify("Error: selected file isn't pickled python 2.7 .dict")
    try:
        lda = dePandas(lda)
    except:
        return jsonify("Error: selected file is .dict, but not LDA")
    return jsonify(lda)


@app.route('/encode/', methods=['POST'])
def json_to_dict():
    if request.method == 'POST':
        # Check if the post request has the file part
        if 'file' not in request.files:
            return jsonify("Error: no file attached to request")
        file = request.files['file']
        if file.filename == '':
            return jsonify("Error: no file attached to request")
    s = file
    try:
        lda = json.load(s)  # For python 2.7 pickles
    except:
        return jsonify("Error: selected file isn't json")
    generated = pickle.dumps(lda, 0)
    return Response(generated, mimetype="text/plain", headers={"Content-Disposition": "attachment; filename=lda.dict"})

# Legacy pages
@app.route('/legacy/')
def legacy():
    return render_template('legacy.html')


if __name__ == '__main__':
    app.run()
