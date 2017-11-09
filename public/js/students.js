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

  function create (student) {
    var settings = Object.assign({}, AJAX_DEFAULT_SETTINGS, {
      method: 'POST',
      data: student
    })

    if (JWT_TOKEN) {
      settings['Authorization'] = 'Bearer ' + JWT_TOKEN
    }

    return jQuery.ajax(API_BASE_URL + '/students', settings)
  }

  function update () {
    return Promise.reject('Method not implemented')
  }

  function delete () {
    return Promise.reject('Method not implemented')
  }

  function setToken (jwtToken) {
    JWT_TOKEN = jwtToken
  }

  return {
    loadOne: loadOne,
    loadAll: loadAll,
    create: create,
    update: update,
    delete: delete,
    setToken: setToken
  }
})()
