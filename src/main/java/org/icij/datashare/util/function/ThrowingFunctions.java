package org.icij.datashare.util.function;

import java.nio.charset.Charset;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.icij.datashare.text.Language;
import org.icij.datashare.text.NamedEntityCategory;
import org.icij.datashare.text.processing.NLPStage;


/**
 * Utility functions class
 *
 * Created by julien on 4/21/16.
 */
public class ThrowingFunctions {

    public static final ThrowingFunction<String, ThrowingFunction<String, List<String>>> split = val ->
            (str) -> Arrays.asList(str.split(val));

    public static final ThrowingFunction<String, List<String>> splitComma     = split.apply(",");
    public static final ThrowingFunction<String, List<String>> splitSemicolon = split.apply(";");
    public static final ThrowingFunction<String, List<String>> splitColon     = split.apply(":");


    public static final ThrowingFunction<String, ThrowingFunction<String, String>> remove = pttrn ->
            (str) -> str.replaceAll(pttrn, "");

    public static final ThrowingFunction<String, String> removeSpaces = remove.apply("(\\s+)");


    public static final ThrowingFunction<String, String> trim = String::trim;

    public static final ThrowingFunction<String, Path> path = val -> Paths.get(trim.apply(val));


    public static final ThrowingFunction<String, Language> parseLanguage = Language::parse;

    public static final ThrowingFunction<String, Boolean>  parseBoolean  = Boolean::parseBoolean;

    public static final ThrowingFunction<String, Integer>  parseInt = Integer::parseInt;

    public static final ThrowingFunction<String, Charset>  parseCharset  = Charset::forName;


    public static final ThrowingFunction<List<String>, Set<NamedEntityCategory>> parseEntities = lst -> lst
            .stream()
            .map(NamedEntityCategory::parse)
            .collect(Collectors.toSet());

    public static final ThrowingFunction<List<String>, Set<NLPStage>> parseStages = lst -> lst
            .stream()
            .map(NLPStage::parse)
            .collect(Collectors.toSet());

    public static final ThrowingFunction<String, ThrowingFunction<List<?>, String>> joinList = sep ->
            (lst) -> String.join(sep, lst
                    .stream()
                    .map(Object::toString)
                    .collect(Collectors.toList()));
    public static final ThrowingFunction<List<?>, String> joinListComma = joinList.apply(",");


    private static Optional<String> getProperty(final String key, final Properties properties) {
        if (properties == null) {
            return Optional.empty();
        }
        String val = properties.getProperty(key);
        return Optional.ofNullable( (val == null || val.isEmpty()) ? null : val );
    }

    public static <T> Optional<T> getProperty(final String key, final Properties properties, Function<String, ? extends T> func) {
        return getProperty(key, properties).map(func);
    }

    public static <T> Optional<T> getProperty(final String key, final Properties properties, ThrowingFunction<String, ? extends T> func) {
        return getProperty(key, properties).map(val -> {
            try {
                return func.apply(val);
            } catch (Exception e) {
                return null;
            }
        });
    }

}
