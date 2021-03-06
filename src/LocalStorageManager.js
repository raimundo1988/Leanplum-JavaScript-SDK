/*
 *
 *  Copyright 2017 Leanplum Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

let localStorageEnabled
let alternateLocalStorage = {}

export default class LocalStorageManager {
  static getFromLocalStorage(key) {
    if (localStorageEnabled === false) {
      return alternateLocalStorage[key]
    }
    return localStorage[key]
  }

  static saveToLocalStorage(key, value) {
    if (localStorageEnabled === false) {
      alternateLocalStorage[key] = value
      return
    }
    try {
      localStorage[key] = value
    } catch (e) {
      localStorageEnabled = false
      alternateLocalStorage[key] = value
    }
  }

  static removeFromLocalStorage(key) {
    if (localStorageEnabled === false) {
      delete alternateLocalStorage[key]
      return
    }
    try {
      localStorage.removeItem(key)
    } catch (e) {
      localStorageEnabled = false
      delete alternateLocalStorage[key]
    }
  }
}
