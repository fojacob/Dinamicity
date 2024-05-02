/* eslint-disable @stylistic/semi */
export class DSManager {
  constructor() {
    this.points = []
    this.lines = []
    this.polygons = []
  }

  addPoint(lat, long, id) {
    let point = new Point (lat, long, id)
    this.points.push(point)
    return point
  }

  findPoint(id) {
    const point = this.points.find(point => point.getId() === id)
    return point
  }

  getPoints() {
    return this.points
  }

  editPoint(id, new_lat, new_lng) {
    const editedPointIndex = this.points.findIndex(point => point.getId() === id)

    if (editedPointIndex !== -1) {
      this.points[editedPointIndex].setLatitude(new_lat)
      this.points[editedPointIndex].setLongitude(new_lng)
      this.points[editedPointIndex].logCoordinates()
    }

    return this.points[editedPointIndex]
  }

  removePoint(id) { // Faz sentido retornar o id do ponto removido?
    const removedPointIndex = this.points.findIndex(point => point.getId() === id)

    if (removedPointIndex !== -1) {
      this.points.splice(removedPointIndex, 1)
      return true
    }

    return false
  }

  // Method to add a new line
  addLine(points) {
    const line = new Line(points, 'Creating new line')
    // add the possibility to add a description alongside the edge info and points
    this.lines.push(line)
    return line
  }

  findLine(id) {
    const line = this.lines.find(line => line.getId() === id)
    return line
  }

  // Method to get all lines
  getLines() {
    return this.lines
  }

  editLine(id, LatLngs) {
    const newPoints = LatLngs.map(latlng => new Point(latlng.lat, latlng.lng))
    const lineToEdit = this.lines.find(line => line.getId() === id)

    if (lineToEdit) {
      lineToEdit.updatePoints(newPoints)
      console.log('Updated line:', lineToEdit)
    }
    else {
      console.log('No line found with the ID:', id)
    }
    console.log('All lines stored:', this.lines)
    // lines.getAllLines() // Log all lines to console after editing
  }

  // Method to remove a line
  removeLine(id) {
    const lineToRemoveIndex = this.lines.findIndex(line => line.getId() === id._leaflet_id)

    if (lineToRemoveIndex !== -1) {
      this.lines.splice(lineToRemoveIndex, 1)
      return true
    }
    return false
  }

  addPolygon(id, LatLngs) {
    const pointObjects = LatLngs.map(latlng => new Point(latlng.lat, latlng.lng))
    let polygon = new Polygon(pointObjects, 'new Polygon', id)
    this.polygons.push(polygon)
    console.log('All polygons stored:', this.polygons)
  }

  findPolygon(id) {
    const polygon = this.polygon.find(polygon => polygon.getId() === id)
    return polygon
  }

  getPolygons() {
    return this.polygons
  }

  editPolygon(id, LatLngs) {
    const newPoints = LatLngs.map(latlng => new Point(latlng.lat, latlng.lng))
    const polygonToEdit = this.polygons.find(polygon => polygon.getId() === id)

    if (polygonToEdit) {
      polygonToEdit.updatePoints(newPoints)
      console.log('Updated polygon:', polygonToEdit)
    }
    else {
      console.log('No polygon found with the ID:', id)
    }
    console.log('All polygons stored:', this.polygons)
  }

  removePolygon(id) {
    const polygonToRemoveIndex = this.polygons.findIndex(polygon => polygon.getId() === id)

    if (polygonToRemoveIndex !== -1) {
      this.polygons.splice(polygonToRemoveIndex, 1)
      console.log(`Removed polygon: ${polygonToRemoveIndex}`)
    }
    console.log('All polygons stored:', this.polygons)
  }
}

export class Point {
  constructor(lat, lon, id) {
    this.lat = lat
    this.lon = lon
    this.id = id
  }

  logCoordinates() {
    console.log(`Latitude: ${this.lat}, Longitude: ${this.lon}`)
  }

  setLatitude(lat) {
    this.lat = lat
  }

  setLongitude(lon) {
    this.lon = lon
  }

  getLatitude() {
    return this.lat
  }

  getLongitude() {
    return this.lon
  }

  getId() {
    return this.id
  }

  distanceTo(otherPoint) {
    const R = 6371
    const lat1 = this.toRadians(this.lat)
    const lat2 = this.toRadians(otherPoint.lat)
    const deltaLat = this.toRadians(otherPoint.lat - this.lat)
    const deltaLon = this.toRadians(otherPoint.lon - this.lon)

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2)
      + Math.cos(lat1) * Math.cos(lat2)
      * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c
  }

  toRadians(degrees) {
    return degrees * (Math.PI / 180)
  }

  toString() {
    return `Latitude: ${this.lat}, Longitude: ${this.lon}`
  }
}

export class Line {
  constructor(points, description, id) {
    this.points = points// Array of coordinate pairs {lat, lng}
    this.description = description // starts as null and we will be able to edit it
    this.id = id
  }

  // Method to set or update the description of the line
  setDescription(description) {
    this.description = description
  }

  // Method to update the coordinates of the line
  updatePoints(newPoints) {
    this.points = newPoints
  }

  getPoints() {
    return this.points
  }

  getId() {
    return this.id
  }
}

export class Polygon {
  constructor(points, description, id) {
    this.points = points// Array of coordinate pairs {lat, lng}
    this.description = description // starts as null and we will be able to edit it
    this.id = id
  }

  // Method to set or update the description of the line
  setDescription(description) {
    this.description = description
  }

  // Method to update the coordinates of the line
  updatePoints(newPoints) {
    this.points = newPoints
  }

  getPoints() {
    return this.points
  }

  getId() {
    return this.id
  }
}
