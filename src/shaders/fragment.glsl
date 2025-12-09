

varying vec3 vColor;
void main()
{
    // float distance = distance(gl_PointCoord, vec2(0.5));
    // distance = step(0.5, distance);
    // distance = 1.0 - distance;

    //defuse point
//     float distance = distance(gl_PointCoord, vec2(0.5));
//    distance *= 2.0;
//     distance = 1.0 - distance;




    // light point
    float distance = distance(gl_PointCoord, vec2(0.5));
    distance = 1.0 - distance;
    distance = pow(distance, 5.0);
    vec3 color = mix(vec3(0.0), vColor, distance);
    gl_FragColor = vec4(color,1.0 );
}