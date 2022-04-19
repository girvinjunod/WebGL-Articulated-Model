precision highp float;
varying vec3 vWorldPosition;
varying vec3 vWorldNormal;

uniform samplerCube uTexture;

uniform int textureFrag;

varying highp vec2 vTextureCoord;
varying highp vec3 vLighting;
uniform sampler2D uSampler;
uniform bool uShading;

varying vec3 ts_light_pos;
varying vec3 ts_view_pos;
varying vec3 ts_frag_pos;

void main(void) {
    if (textureFrag == 0){
        highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
        if (uShading) {
            gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
        } else {
            gl_FragColor = texelColor;
        }

    } else if (textureFrag == 1) {
        vec3 worldNormal = normalize(vWorldNormal);
        vec3 eyeToSurfaceDir = normalize(vWorldPosition);
        vec3 direction = reflect(eyeToSurfaceDir, worldNormal);
        gl_FragColor = textureCube(uTexture, direction);

    } else {
        vec3 light_dir = normalize(ts_light_pos - ts_frag_pos);
        vec3 view_dir = normalize(ts_view_pos - ts_frag_pos);
        vec3 albedo = texture2D(uSampler, vTextureCoord).rgb;
        vec3 ambient = 0.3 * albedo;
        vec3 norm = normalize(texture2D(uSampler, vTextureCoord).rgb * 2.0 - 1.0);
        float diffuse = max(dot(light_dir, norm), 0.0);
        gl_FragColor = vec4(diffuse * albedo + ambient, 1.0);
    }
}