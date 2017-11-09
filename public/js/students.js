/**
 * Student class
 *
 * Provides methods for student manipulations using the API.
 * @see https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript
 * @see http://api.jquery.com/jQuery.ajax/
 */
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

  function update (student) {
    var settings = Object.assign({}, AJAX_DEFAULT_SETTINGS, {
      method: 'PUT',
      data: student
    })

    if (JWT_TOKEN) {
      settings['Authorization'] = 'Bearer ' + JWT_TOKEN
    }

    return jQuery.ajax(API_BASE_URL + '/students/' + student.username, settings)
  }

  function destroy (username) {
    var settings = Object.assign({}, AJAX_DEFAULT_SETTINGS, {
      method: 'DELETE'
    })

    if (JWT_TOKEN) {
      settings['Authorization'] = 'Bearer ' + JWT_TOKEN
    }

    return jQuery.ajax(API_BASE_URL + '/students/' + student.username, settings)
  }

  function setToken (jwtToken) {
    JWT_TOKEN = jwtToken
  }

  return {
    loadOne: loadOne,
    loadAll: loadAll,
    create: create,
    update: update,
    destroy: destroy,
    setToken: setToken
  }
})()
