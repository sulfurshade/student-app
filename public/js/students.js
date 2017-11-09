var Student = (function () {
  var AJAX_DEFAULT_SETTINGS = {
    contentType: 'application/json; charset=utf-8',
    dataType: 'json'
  }
  var API_BASE_URL = '//api';
  var JWT_TOKEN = null;

  function loadOne (username) {
    var settings = Object.assign({}, AJAX_DEFAULT_SETTINGS)

    if (JWT_TOKEN) {
      settings['Authorization'] = 'Bearer ' + JWT_TOKEN
    }

    return jQuery.ajax(API_BASE_URL + '/students/' + username, settings)
  }

  function loadAll () {
    var settings = Object.assign({}, AJAX_DEFAULT_SETTINGS)

    if (JWT_TOKEN) {
      settings['Authorization'] = 'Bearer ' + JWT_TOKEN
    }

    return jQuery.ajax(API_BASE_URL + '/students', settings)
  }

  function save () {
    return Promise.reject('Method not implemented')
  }

  function update () {
    return Promise.reject('Method not implemented')
  }

  function delete () {
    return Promise.reject('Method not implemented')
  }

  return {
    loadOne: loadOne,
    loadAll: loadAll,
    save: save,
    update: update,
    delete: delete
  }
})()
