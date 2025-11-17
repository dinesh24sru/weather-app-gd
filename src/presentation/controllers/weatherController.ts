/**
 * @openapi
 * /v1/api/weather:
 *   get:
 *     summary: Get today's short weather forecast
 *     description: Returns the forecast summary, temperature, and characterization (hot, moderate, cold) for given coordinates.
 *     parameters:
 *       - in: query
 *         name: lat
 *         schema:
 *           type: number
 *           minimum: -90
 *           maximum: 90
 *         required: true
 *         description: Latitude
 *       - in: query
 *         name: lon
 *         schema:
 *           type: number
 *           minimum: -180
 *           maximum: 180
 *         required: true
 *         description: Longitude
 *     responses:
 *       200:
 *         description: Forecast retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 summary:
 *                   type: string
 *                   example: Partly Cloudy
 *                 temperature:
 *                   type: number
 *                   example: 68
 *                 characterization:
 *                   type: string
 *                   enum: [cold, moderate, hot]
 *       400:
 *         description: Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid query parameters
 *                 details:
 *                   type: array
 *                   items:
 *                     type: object
 *       502:
 *         description: External API error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: NWS API error
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
