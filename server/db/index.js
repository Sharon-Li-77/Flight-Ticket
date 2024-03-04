import db from './connection.js'

export async function getMyTickets(passengerId) {
  return db('tickets').where('passenger_id', passengerId)
}

export async function getMyTicketsByDob(dob) {
  return db('tickets')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .where('passengers.dob', dob)
}

export async function countMyTicketsByDob(dob) {
  return db('tickets')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .where('passengers.dob', dob)
    .count('tickets.id as count')
    .first()
}

export async function countMyLostLuggage(dob) {
  return db('luggage')
    .join('tickets', 'tickets.id', 'luggage.ticket_id')
    .join('passengers', 'passengers.id', 'tickets.passenger_id')
    .where('passengers.dob', dob)
    .where('luggage.is_lost', true)
    .count('luggage.is_lost as count')
    .first()
}

export async function sumMyLostLuggageWeight(dob) {
  return db('luggage')
    .join('tickets', 'tickets.id', 'luggage.ticket_id')
    .join('passengers', 'passengers.id', 'tickets.passenger_id')
    .where('passengers.dob', dob)
    .where('luggage.is_lost', true)
    .sum('luggage.weight as sum')
    .first()
}

export async function getMyLostLuggageLocation(dob) {
  return db('luggage')
    .join('tickets', 'tickets.id', 'luggage.ticket_id')
    .join('passengers', 'passengers.id', 'tickets.passenger_id')
    .join('airports', 'airports.id', 'luggage.located_airport_id')
    .where('passengers.dob', dob)
    .where('luggage.is_lost', true)
    .select('airports.name', 'airports.phone', 'airports.email')
}

export async function getAllTicketInformation(passengerId) {
  return db('tickets')
    .join('passengers', 'passengers.id', 'tickets.passenger_id')
    .join(
      'airports as departure',
      'departure.id',
      'tickets.departure_airport_id'
    )
    .join('airports as arrival', 'tickets.arrival_airport_id', 'arrival.id')
    .join('airplanes', 'airplanes.id', 'tickets.airplane_id')
    .where('tickets.passenger_id', passengerId)
    .select(
      'tickets.flight_number',
      'tickets.departure_time',
      'tickets.id',
      'tickets.arrival_time',
      'departure.name as departure ',
      'arrival.name as arrival',
      'passengers.fullname',
      'airplanes.model'
    )
    .first()
}
