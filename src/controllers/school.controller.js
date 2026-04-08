const { pool } = require('../config/db');

/**
 * @param {number} lat1 
 * @param {number} lon1 
 * @param {number} lat2 
 * @param {number} lon2 
 * @returns {number} 
 */
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; 
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    const [result] = await pool.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name.trim(), address.trim(), parseFloat(latitude), parseFloat(longitude)]
    );

    return res.status(201).json({
      success: true,
      message: 'School added successfully',
      data: {
        id: result.insertId,
        name: name.trim(),
        address: address.trim(),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    });
  } catch (error) {
    console.error('Error in addSchool:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error. Failed to add school.',
    });
  }
};

/**
 * GET /listSchools
 * Returns all schools sorted by proximity to the user's location.
 */
const listSchools = async (req, res) => {
  try {
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);

    const [schools] = await pool.execute(
      'SELECT id, name, address, latitude, longitude FROM schools'
    );

    if (schools.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No schools found in the database',
        data: [],
      });
    }

    // Compute distance for each school and attach it
    const schoolsWithDistance = schools.map((school) => ({
      ...school,
      distance_km: parseFloat(
        haversineDistance(userLat, userLon, school.latitude, school.longitude).toFixed(4)
      ),
    }));

    // Sort ascending by distance
    schoolsWithDistance.sort((a, b) => a.distance_km - b.distance_km);

    return res.status(200).json({
      success: true,
      message: 'Schools retrieved and sorted by proximity',
      user_location: { latitude: userLat, longitude: userLon },
      total: schoolsWithDistance.length,
      data: schoolsWithDistance,
    });
  } catch (error) {
    console.error('Error in listSchools:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error. Failed to fetch schools.',
    });
  }
};

module.exports = { addSchool, listSchools };
